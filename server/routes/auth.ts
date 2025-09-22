import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import { authenticate as authMiddleware } from '../middleware/auth';
import { sendEmail } from '../services/email';
import { sendSMS } from '../services/sms';
import { OTPService } from '../services/otp';

const router = express.Router();

// Admin registration endpoint (one-time setup)
router.post('/register-admin', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Security: Only allow specific admin email
    if (email !== 'pushkarkumarsaini2006@gmail.com') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized admin registration attempt'
      });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Normalize phone number (remove country code if present)
    let normalizedPhone = phone || '9999999999';
    if (normalizedPhone.startsWith('+91')) {
      normalizedPhone = normalizedPhone.substring(3);
    } else if (normalizedPhone.startsWith('91')) {
      normalizedPhone = normalizedPhone.substring(2);
    }

    // Create admin user
    const admin = new User({
      firstName: firstName || 'Pushkar',
      lastName: lastName || 'Saini',
      email: 'pushkarkumarsaini2006@gmail.com',
      password: hashedPassword,
      phone: normalizedPhone, // 10-digit phone number
      role: 'admin',
      address: {
        street: 'Admin Address',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India'
      },
      isEmailVerified: true, // Admin is pre-verified
      isPhoneVerified: true,
      loginAttempts: 0,
      isTwoFactorEnabled: false,
      languagePreference: 'en',
      notificationPreferences: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true
      },
      accountStatus: 'active'
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        user: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          phone: admin.phone,
          role: admin.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Admin registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role = 'customer' } = req.body;

    // Validation
    if (!firstName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'First name, email, password, and phone are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with required address object but mark as unverified
    const user = new User({
      firstName,
      lastName: lastName || '',
      email,
      password: hashedPassword,
      phone,
      role,
      address: {
        city: 'Delhi', // Default city
        state: 'Delhi',
        pincode: '110001',
        country: 'India'
      },
      isEmailVerified: false,
      isPhoneVerified: false,
      loginAttempts: 0,
      isTwoFactorEnabled: false,
      languagePreference: 'hi',
      notificationPreferences: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true
      },
      accountStatus: 'pending' // Mark as pending until OTP verification
    });

    await user.save();

    // Generate OTP for phone verification
    const phoneOTP = OTPService.generateOTP();
    OTPService.storeOTP(phone, phoneOTP);

    // Generate OTP for email verification
    const emailOTP = OTPService.generateOTP();
    OTPService.storeOTP(email, emailOTP);

    // Send OTP via SMS (if service is configured)
    try {
      await sendSMS({
        to: phone,
        message: `Your Nagrik Sewa verification code is: ${phoneOTP}. Valid for 10 minutes.`,
        otp: phoneOTP
      });
    } catch (smsError) {
      console.log('SMS OTP (for testing):', phoneOTP);
    }

    // Send OTP via Email (using EmailJS)
    try {
      await sendEmail({
        to: email,
        subject: 'Verify Your Nagrik Sewa Account',
        template: 'email-otp',
        data: {
          name: firstName,
          otp: emailOTP
        }
      });
    } catch (emailError) {
      console.log('Email OTP (for testing):', emailOTP);
    }

    // Don't return token yet - user needs to verify first
    res.status(201).json({
      success: true,
      message: 'Registration initiated. Please verify your phone and email with the OTP codes sent.',
      data: {
        userId: user._id,
        email: user.email,
        phone: user.phone,
        requiresVerification: true,
        // For development/testing - remove in production
        testOTP: {
          phone: phoneOTP,
          email: emailOTP
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, phoneOTP, emailOTP } = req.body;

    // Validation
    if (!userId || (!phoneOTP && !emailOTP)) {
      return res.status(400).json({
        success: false,
        message: 'User ID and at least one OTP (phone or email) are required'
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let phoneVerified = user.isPhoneVerified;
    let emailVerified = user.isEmailVerified;

    // Verify phone OTP if provided
    if (phoneOTP && !user.isPhoneVerified) {
      const phoneVerification = OTPService.verifyOTP(user.phone, phoneOTP);
      if (phoneVerification.success) {
        phoneVerified = true;
        user.isPhoneVerified = true;
      } else {
        return res.status(400).json({
          success: false,
          message: `Phone OTP verification failed: ${phoneVerification.message}`
        });
      }
    }

    // Verify email OTP if provided
    if (emailOTP && !user.isEmailVerified) {
      const emailVerification = OTPService.verifyOTP(user.email, emailOTP);
      if (emailVerification.success) {
        emailVerified = true;
        user.isEmailVerified = true;
      } else {
        return res.status(400).json({
          success: false,
          message: `Email OTP verification failed: ${emailVerification.message}`
        });
      }
    }

    // If both are verified, activate the account
    if (phoneVerified && emailVerified) {
      user.accountStatus = 'active';
      await user.save();

      // Generate JWT token now that user is verified
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Account verified successfully! You can now login.',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified
          },
          token
        }
      });
    } else {
      // Save partial verification progress
      await user.save();
      
      res.json({
        success: true,
        message: 'Partial verification completed. Please verify both phone and email.',
        data: {
          userId: user._id,
          phoneVerified: user.isPhoneVerified,
          emailVerified: user.isEmailVerified,
          requiresVerification: !(user.isPhoneVerified && user.isEmailVerified)
        }
      });
    }

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Resend OTP endpoint
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId, type } = req.body; // type: 'phone' or 'email'

    if (!userId || !type) {
      return res.status(400).json({
        success: false,
        message: 'User ID and OTP type are required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (type === 'phone' && !user.isPhoneVerified) {
      const phoneOTP = OTPService.generateOTP();
      OTPService.storeOTP(user.phone, phoneOTP);

      try {
        await sendSMS({
          to: user.phone,
          message: `Your Nagrik Sewa verification code is: ${phoneOTP}. Valid for 10 minutes.`,
          otp: phoneOTP
        });
      } catch (smsError) {
        console.log('SMS OTP (for testing):', phoneOTP);
      }

      res.json({
        success: true,
        message: 'Phone OTP resent successfully',
        testOTP: phoneOTP // Remove in production
      });

    } else if (type === 'email' && !user.isEmailVerified) {
      const emailOTP = OTPService.generateOTP();
      OTPService.storeOTP(user.email, emailOTP);

      try {
        await sendEmail({
          to: user.email,
          subject: 'Verify Your Nagrik Sewa Account',
          template: 'email-otp',
          data: {
            name: user.firstName,
            otp: emailOTP
          }
        });
      } catch (emailError) {
        console.log('Email OTP (for testing):', emailOTP);
      }

      res.json({
        success: true,
        message: 'Email OTP resent successfully',
        testOTP: emailOTP // Remove in production
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP type or already verified'
      });
    }

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user with password field included
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is verified
    if (!user.isEmailVerified || !user.isPhoneVerified) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified. Please verify your email and phone number.',
        data: {
          userId: user._id,
          requiresVerification: true,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Send OTP for phone verification
router.post('/send-otp', authMiddleware, async (req, res) => {
  try {
    const { type = 'both' } = req.body; // 'phone', 'email', or 'both'
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with OTP
    await User.findByIdAndUpdate(userId, {
      phoneVerificationOTP: otp,
      otpExpiry: otpExpiry
    });

    const promises = [];

    // Send SMS OTP if requested
    if (type === 'phone' || type === 'both') {
      const smsMessage = `Your Nagrik Sewa verification code is: ${otp}. This code will expire in 10 minutes. Do not share this code with anyone.`;
      promises.push(
        sendSMS({ to: user.phone, message: smsMessage }).catch(error => {
          console.error('SMS sending failed:', error);
          return { success: false, type: 'sms', error: error.message };
        })
      );
    }

    // Send Email OTP if requested
    if (type === 'email' || type === 'both') {
      promises.push(
        sendEmail({
          to: user.email,
          subject: 'Nagrik Sewa Verification Code',
          template: 'email-otp',
          data: {
            name: user.firstName,
            otp: otp
          }
        }).catch(error => {
          console.error('Email sending failed:', error);
          return { success: false, type: 'email', error: error.message };
        })
      );
    }

    // Wait for all sending attempts
    const results = await Promise.all(promises);
    
    const responses = {
      sms: type === 'phone' || type === 'both' ? results[0] : null,
      email: type === 'email' || type === 'both' ? results[type === 'both' ? 1 : 0] : null
    };

    res.json({
      success: true,
      message: `OTP sent successfully to ${type === 'both' ? 'phone and email' : type}`,
      data: {
        expiresAt: otpExpiry,
        sentTo: {
          phone: type === 'phone' || type === 'both',
          email: type === 'email' || type === 'both'
        },
        results: responses
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
});

// Verify OTP
router.post('/verify-otp', authMiddleware, async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP is required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if OTP exists and is not expired
    if (!user.phoneVerificationOTP || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new OTP.'
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (user.phoneVerificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      });
    }

    // Mark phone as verified and clear OTP
    await User.findByIdAndUpdate(userId, {
      isPhoneVerified: true,
      $unset: {
        phoneVerificationOTP: 1,
        otpExpiry: 1
      }
    });

    res.json({
      success: true,
      message: 'Phone number verified successfully',
      data: {
        isPhoneVerified: true
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP'
    });
  }
});

// Resend OTP
router.post('/resend-otp', authMiddleware, async (req, res) => {
  try {
    const { type = 'both' } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user already verified
    if (user.isPhoneVerified) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is already verified'
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP
    await User.findByIdAndUpdate(userId, {
      phoneVerificationOTP: otp,
      otpExpiry: otpExpiry
    });

    const promises = [];

    // Send SMS OTP if requested
    if (type === 'phone' || type === 'both') {
      const smsMessage = `Your Nagrik Sewa verification code is: ${otp}. This code will expire in 10 minutes.`;
      promises.push(sendSMS({ to: user.phone, message: smsMessage }));
    }

    // Send Email OTP if requested
    if (type === 'email' || type === 'both') {
      promises.push(
        sendEmail({
          to: user.email,
          subject: 'Nagrik Sewa Verification Code (Resent)',
          template: 'email-otp',
          data: {
            name: user.firstName,
            otp: otp
          }
        })
      );
    }

    await Promise.all(promises);

    res.json({
      success: true,
      message: `New OTP sent successfully to ${type === 'both' ? 'phone and email' : type}`,
      data: {
        expiresAt: otpExpiry,
        sentTo: {
          phone: type === 'phone' || type === 'both',
          email: type === 'email' || type === 'both'
        }
      }
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP'
    });
  }
});

export default router;
