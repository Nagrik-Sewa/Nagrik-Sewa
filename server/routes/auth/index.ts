import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../../models/User';
import { WorkerProfile } from '../../models/WorkerProfile';
import { generateToken, generateRefreshToken, authenticate } from '../../middleware/auth';
import { validateInput, schemas, authRateLimit, otpRateLimit } from '../../middleware/security';
import { sendEmail } from '../../services/email.js';
import { sendSMS } from '../../services/sms.js';
import googleAuthRouter from './google';

const router = Router();

// Apply rate limiting to auth routes
router.use('/login', authRateLimit);
router.use('/register', authRateLimit);
router.use('/send-otp', otpRateLimit);

// Google OAuth routes
router.use('/', googleAuthRouter);

// Register new user
router.post('/register', validateInput(schemas.register), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, phone, password, firstName, lastName, role, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Phone number already registered'
      });
      return;
    }

    // Create new user (with email automatically verified for testing)
    const user = new User({
      email,
      phone,
      password,
      firstName,
      lastName,
      role,
      address,
      isEmailVerified: true, // Auto-verify for testing
      emailVerifiedAt: new Date() // Set verification timestamp
    });

    // Skip email verification token generation for testing
    await user.save();

    // If worker role, create worker profile
    if (role === 'worker') {
      const workerProfile = new WorkerProfile({
        userId: user._id,
        description: 'New worker profile',
        experience: 0,
        skills: [],
        serviceCategories: [],
        serviceAreas: [{
          city: address.city,
          state: address.state,
          radius: 10
        }]
      });
      await workerProfile.save();
    }

    // Skip verification email for testing - email is auto-verified
    console.log('📧 Email verification skipped for testing - user auto-verified');

    // Generate tokens
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Email auto-verified for testing.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login with email and password
router.post('/login', validateInput(schemas.login), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Check if account is locked
    if (user.isAccountLocked()) {
      res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
      return;
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      await user.incLoginAttempts();
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Generate tokens
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          avatar: user.avatar
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Send OTP for phone verification/login
router.post('/send-otp', validateInput(schemas.requestOTP), async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;

    // Find user by phone
    let user = await User.findOne({ phone });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Phone number not registered'
      });
      return;
    }

    // Generate OTP
    const otp = user.generatePhoneOTP();
    await user.save();

    // Send OTP via SMS
    try {
      await sendSMS({
        to: phone,
        message: `Your Nagrik Sewa verification code is: ${otp}. Valid for 10 minutes. Do not share with anyone.`
      });

      res.json({
        success: true,
        message: 'OTP sent successfully'
      });
    } catch (smsError) {
      console.error('Failed to send SMS:', smsError);
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
});

// Verify OTP and login
router.post('/verify-otp', validateInput(schemas.phoneLogin), async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Check if OTP is valid and not expired
    if (!user.phoneVerificationOTP || user.phoneVerificationOTP !== otp) {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
      return;
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      res.status(400).json({
        success: false,
        message: 'OTP has expired'
      });
      return;
    }

    // Mark phone as verified and clear OTP
    user.isPhoneVerified = true;
    user.phoneVerificationOTP = undefined;
    user.otpExpiry = undefined;
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      message: 'Phone verified successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          avatar: user.avatar
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed'
    });
  }
});

// Verify email
router.post('/verify-email', validateInput(schemas.verifyEmail), async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
});

// Forgot password
router.post('/forgot-password', validateInput(schemas.forgotPassword), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists or not
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Store hashed token and expiry (1 hour)
    user.emailVerificationToken = hashedToken;
    user.otpExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // Send reset email
    try {
      await sendEmail({
        to: email,
        subject: 'Password Reset - Nagrik Sewa',
        html: `
          <h2>Password Reset Request</h2>
          <p>Hello ${user.firstName},</p>
          <p>You have requested to reset your password for your Nagrik Sewa account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
    }

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request'
    });
  }
});

// Reset password
router.post('/reset-password', validateInput(schemas.resetPassword), async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    // Hash the token to match stored version
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      otpExpiry: { $gt: new Date() }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
      return;
    }

    // Update password
    user.password = password;
    user.emailVerificationToken = undefined;
    user.otpExpiry = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed'
    });
  }
});

// Get current user profile
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user!;

    // Get worker profile if user is a worker
    let workerProfile = null;
    if (user.role === 'worker') {
      workerProfile = await WorkerProfile.findOne({ userId: user._id });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          languagePreference: user.languagePreference,
          notificationPreferences: user.notificationPreferences,
          createdAt: user.createdAt
        },
        workerProfile
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticate, validateInput(schemas.updateProfile), async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    const updates = req.body;

    // Update user fields
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        (user as any)[key] = updates[key];
      }
    });

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          languagePreference: user.languagePreference,
          notificationPreferences: user.notificationPreferences
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Logout (client-side token invalidation)
router.post('/logout', authenticate, async (req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Send email verification
router.post('/send-verification-email', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    if (user.isEmailVerified) {
      res.status(400).json({
        success: false,
        message: 'Email already verified'
      });
      return;
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.VITE_API_URL}/auth/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Email Verification - Nagrik Sewa',
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${user.firstName},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire soon for security reasons.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      `
    });

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('❌ Send verification email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification email'
    });
  }
});

// Send phone OTP
router.post('/send-phone-otp', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    if (user.isPhoneVerified) {
      res.status(400).json({
        success: false,
        message: 'Phone already verified'
      });
      return;
    }

    if (!user.phone) {
      res.status(400).json({
        success: false,
        message: 'No phone number associated with account'
      });
      return;
    }

    // Generate OTP using the user model method
    const otp = user.generatePhoneOTP();
    await user.save();

    // Send OTP via SMS
    try {
      await sendSMS({
        to: user.phone,
        message: `Your Nagrik Sewa verification code is: ${otp}. Valid for 10 minutes. Do not share with anyone.`
      });

      res.json({
        success: true,
        message: 'OTP sent to your phone number'
      });
    } catch (smsError) {
      console.error('Failed to send SMS:', smsError);
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP'
      });
    }
  } catch (error) {
    console.error('Send phone OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
});

// Verify phone OTP
router.post('/verify-phone-otp', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp } = req.body;
    const userId = (req as any).user.userId;

    if (!otp) {
      res.status(400).json({
        success: false,
        message: 'OTP is required'
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Verify OTP using the OTP service
    // Check if OTP is valid and not expired
    if (!user.phoneVerificationOTP || user.phoneVerificationOTP !== otp) {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
      return;
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      res.status(400).json({
        success: false,
        message: 'OTP has expired'
      });
      return;
    }

    // Mark phone as verified and clear OTP
    user.isPhoneVerified = true;
    user.phoneVerificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Phone number verified successfully'
    });
  } catch (error) {
    console.error('❌ Verify phone OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify phone OTP'
    });
  }
});

// Verify DigiLocker
router.post('/verify-digilocker', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { verificationData } = req.body;
    const userId = (req as any).user.userId;

    if (!verificationData) {
      res.status(400).json({
        success: false,
        message: 'Verification data is required'
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // In a real implementation, you would verify the DigiLocker data
    // against the actual DigiLocker API and validate the documents
    
    // For now, we'll store the verification data and mark as verified
    user.isDigiLockerVerified = true;
    user.digiLockerData = {
      aadhaarNumber: verificationData.aadhaar?.number || '',
      name: verificationData.aadhaar?.name || user.firstName + ' ' + user.lastName,
      dob: verificationData.aadhaar?.dob || '',
      gender: verificationData.aadhaar?.gender || '',
      address: {
        house: verificationData.aadhaar?.address?.house || '',
        street: verificationData.aadhaar?.address?.street || '',
        locality: verificationData.aadhaar?.address?.locality || '',
        city: verificationData.aadhaar?.address?.city || user.address?.city || '',
        state: verificationData.aadhaar?.address?.state || user.address?.state || '',
        pincode: verificationData.aadhaar?.address?.pincode || user.address?.pincode || ''
      },
      verificationDate: new Date(),
      verificationId: crypto.randomBytes(16).toString('hex'),
      documentsVerified: verificationData.documents?.map((doc: any) => doc.name) || []
    };

    await user.save();

    res.json({
      success: true,
      message: 'DigiLocker verification completed successfully',
      data: {
        verificationId: user.digiLockerData.verificationId,
        verificationDate: user.digiLockerData.verificationDate
      }
    });
  } catch (error) {
    console.error('❌ DigiLocker verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify DigiLocker data'
    });
  }
});

// Check verification status
router.get('/verification-status', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const verificationStatus = {
      email: {
        verified: user.isEmailVerified,
        required: true
      },
      phone: {
        verified: user.isPhoneVerified,
        required: false,
        hasPhone: !!user.phone
      },
      digilocker: {
        verified: user.isDigiLockerVerified,
        required: false
      }
    };

    const needsVerification = !user.isEmailVerified || 
      (user.phone && !user.isPhoneVerified) ||
      !user.isDigiLockerVerified;

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        verification: verificationStatus,
        needsVerification
      }
    });
  } catch (error) {
    console.error('❌ Verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status'
    });
  }
});

export default router;
