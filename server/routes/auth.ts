import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import { WorkerProfile } from '../models/WorkerProfile';
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
    if (email !== 'admin@nagriksewa.co.in') {
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
      email: 'admin@nagriksewa.co.in',
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
    const { 
      firstName, 
      lastName, 
      email: rawEmail, 
      password, 
      phone, 
      role = 'customer',
      // Worker-specific fields
      district,
      primarySkill,
      experience
    } = req.body;

    // Debug logging (safe - no passwords)
    console.log('[REGISTER] Request received:', {
      firstName,
      lastName,
      email: rawEmail,
      phone,
      role,
      hasPassword: !!password,
      passwordLength: password?.length,
      district,
      primarySkill,
      experience
    });

    // Validation
    if (!firstName || !rawEmail || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'First name, email, password, and phone are required'
      });
    }

    // Worker-specific validation
    if (role === 'worker') {
      if (!district || !primarySkill || !experience) {
        return res.status(400).json({
          success: false,
          message: 'District, primary skill, and experience are required for workers'
        });
      }
    }

    // Additional password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Normalize email: trim whitespace and convert to lowercase
    const email = rawEmail.trim().toLowerCase();

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

    // Normalize phone number (remove country code and spaces if present)
    let normalizedPhone = phone;
    if (normalizedPhone.startsWith('+91')) {
      normalizedPhone = normalizedPhone.substring(3).trim();
    } else if (normalizedPhone.startsWith('91')) {
      normalizedPhone = normalizedPhone.substring(2).trim();
    }
    // Remove any remaining spaces or special characters
    normalizedPhone = normalizedPhone.replace(/\s+/g, '');

    // Store user data temporarily (don't save to database yet)
    // Password is stored as plain text here; mongoose pre-save hook will hash it when user.save() is called
    const pendingUserData: any = {
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email, // Already normalized
      password, // Plain text - will be hashed by mongoose pre-save hook
      phone: normalizedPhone,
      role,
      address: {
        city: district || 'Delhi', // Use provided district or default
        state: 'Delhi',
        pincode: '110001',
        country: 'India'
      },
      languagePreference: 'hi',
      notificationPreferences: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true
      }
    };

    // Store worker-specific fields if role is worker
    if (role === 'worker') {
      pendingUserData.workerData = {
        district,
        primarySkill,
        experience
      };
    }

    console.log('[REGISTER] Storing pending user data for:', email);

    // Store pending user with email as identifier
    OTPService.storePendingUser(email, pendingUserData as any);

    // Generate OTP for phone verification
    const phoneOTP = OTPService.generateOTP();
    // Store OTP with both normalized and original phone format for verification
    OTPService.storeOTP(normalizedPhone, phoneOTP);
    OTPService.storeOTP(phone, phoneOTP); // Also store with original format

    // Generate OTP for email verification
    const emailOTP = OTPService.generateOTP();
    OTPService.storeOTP(email, emailOTP);

    // Send OTP via SMS (if service is configured)
    try {
      await sendSMS({
        to: normalizedPhone, // Use normalized phone for SMS
        message: `Your Nagrik Sewa verification code is: ${phoneOTP}. Valid for 10 minutes.`,
        otp: phoneOTP
      });
    } catch (smsError) {
      console.error('Failed to send SMS OTP:', smsError);
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
      console.error('Failed to send Email OTP:', emailError);
    }

    // Don't return token yet - user needs to verify first
    res.status(201).json({
      success: true,
      message: 'Registration initiated. Please verify your phone and email with the OTP codes sent.',
      data: {
        email: email,
        phone: normalizedPhone,
        requiresVerification: true
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
    const { email: rawEmail, phoneOTP, emailOTP } = req.body;

    // Normalize email
    const email = rawEmail?.trim().toLowerCase();

    console.log('[VERIFY-OTP] Request received:', { email, hasPhoneOTP: !!phoneOTP, hasEmailOTP: !!emailOTP, phoneOTPValue: phoneOTP, emailOTPValue: emailOTP });

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!phoneOTP && !emailOTP) {
      return res.status(400).json({
        success: false,
        message: 'At least one OTP (phone or email) is required'
      });
    }

    // Get pending user data
    const pendingUserData = OTPService.getPendingUser(email);
    if (!pendingUserData) {
      console.log('[VERIFY-OTP] No pending user found for:', email);
      return res.status(400).json({
        success: false,
        message: 'Registration session expired or not found. Please register again.',
        errorCode: 'SESSION_EXPIRED'
      });
    }

    console.log('[VERIFY-OTP] Pending user found:', {
      email: pendingUserData.email,
      phone: pendingUserData.phone,
      hasPassword: !!pendingUserData.password,
      passwordLength: pendingUserData.password?.length
    });

    let phoneVerified = false;
    let emailVerified = false;

    // Verify phone OTP if provided
    if (phoneOTP) {
      const phoneVerification = OTPService.verifyOTP(pendingUserData.phone, phoneOTP);
      if (phoneVerification.success) {
        phoneVerified = true;
      } else {
        return res.status(400).json({
          success: false,
          message: `Phone OTP verification failed: ${phoneVerification.message}`
        });
      }
    }

    // Verify email OTP if provided
    if (emailOTP) {
      const emailVerification = OTPService.verifyOTP(email, emailOTP);
      if (emailVerification.success) {
        emailVerified = true;
      } else {
        return res.status(400).json({
          success: false,
          message: `Email OTP verification failed: ${emailVerification.message}`
        });
      }
    }

    // If both are verified, create the user in database
    if (phoneVerified && emailVerified) {
      console.log('[VERIFY-OTP] Both OTPs verified, creating user...');

      // Validate pending user data
      if (!pendingUserData.password) {
        console.error('[VERIFY-OTP] No password in pending user data');
        return res.status(500).json({
          success: false,
          message: 'Registration data corrupted. Please register again.'
        });
      }

      // Create user in database now
      // Password will be hashed by mongoose pre-save hook
      const user = new User({
        firstName: pendingUserData.firstName,
        lastName: pendingUserData.lastName || '',
        email: pendingUserData.email, // Already normalized
        phone: pendingUserData.phone,
        role: pendingUserData.role,
        address: pendingUserData.address,
        isEmailVerified: true,
        isPhoneVerified: true,
        loginAttempts: 0,
        isTwoFactorEnabled: false,
        languagePreference: pendingUserData.languagePreference || 'hi',
        notificationPreferences: pendingUserData.notificationPreferences,
        accountStatus: 'active'
      });

      // Set password explicitly (required because it has select: false)
      // The pre-save hook will hash this plain text password
      user.password = pendingUserData.password;

      console.log('[VERIFY-OTP] About to save user with password length:', pendingUserData.password?.length);
      
      try {
        await user.save();
        console.log('[VERIFY-OTP] User saved successfully:', user._id);
      } catch (saveError: any) {
        console.error('[VERIFY-OTP] Error saving user:', saveError);
        return res.status(500).json({
          success: false,
          message: 'Failed to create user account',
          error: saveError.message || 'Database error'
        });
      }

      // Create worker profile if user is a worker
      if (user.role === 'worker' && pendingUserData.workerData) {
        try {
          const { district, primarySkill, experience } = pendingUserData.workerData;
          
          // Parse experience to number (handle "0-1", "1-2", "2-5", "5-10", "10+" format)
          let experienceYears = 0;
          if (experience.includes('+')) {
            experienceYears = parseInt(experience);
          } else if (experience.includes('-')) {
            const [min] = experience.split('-');
            experienceYears = parseInt(min);
          }

          const workerProfile = new WorkerProfile({
            userId: user._id,
            description: `${primarySkill} with ${experience} years of experience`,
            experience: experienceYears,
            skills: [{
              name: primarySkill,
              category: primarySkill,
              level: experienceYears >= 5 ? 'expert' : experienceYears >= 2 ? 'intermediate' : 'beginner',
              yearsOfExperience: experienceYears
            }],
            serviceCategories: [primarySkill],
            verification: {
              status: 'pending',
              documents: [],
              backgroundCheck: {
                status: 'pending'
              },
              skillAssessments: [],
              referencesChecked: false,
              manualReviewCompleted: false
            },
            availability: {
              schedule: [],
              timeZone: 'Asia/Kolkata',
              isCurrentlyAvailable: true,
              emergencyAvailable: false
            },
            portfolio: [],
            rating: {
              average: 0,
              totalReviews: 0,
              breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
              categories: {
                quality: 0,
                punctuality: 0,
                communication: 0,
                pricing: 0,
                professionalism: 0
              }
            },
            pricing: {
              hourlyRate: 0,
              minimumCharge: 0,
              currency: 'INR',
              discounts: [],
              cancellationPolicy: 'Standard cancellation policy applies'
            },
            statistics: {
              totalJobs: 0,
              completedJobs: 0,
              cancelledJobs: 0,
              ongoingJobs: 0,
              totalEarnings: 0,
              averageJobValue: 0,
              completionRate: 0,
              responseTime: 0,
              acceptanceRate: 0,
              repeatCustomerRate: 0
            },
            badges: [],
            preferences: {
              serviceRadius: 10,
              preferredLocations: [district],
              autoAcceptBookings: false,
              instantBooking: false,
              minNoticeHours: 2,
              maxConcurrentJobs: 3,
              workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            }
          });

          await workerProfile.save();
          console.log('[VERIFY-OTP] Worker profile created successfully for user:', user._id);
        } catch (profileError: any) {
          console.error('[VERIFY-OTP] Error creating worker profile:', profileError);
          // Don't fail registration if profile creation fails - can be created later
        }
      }

      // Clean up pending user data
      OTPService.removePendingUser(email);

      // Send welcome email
      try {
        await sendEmail({
          to: user.email,
          subject: 'Welcome to Nagrik Sewa - Registration Successful! 🇮🇳',
          template: 'welcome',
          data: {
            name: user.firstName,
            email: user.email,
            dashboardLink: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/dashboard` : 'https://nagriksewa.co.in/dashboard'
          }
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail registration if welcome email fails
      }

      // Generate JWT token now that user is verified
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Account verified and created successfully! You can now login.',
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
      res.json({
        success: true,
        message: 'Partial verification completed. Please verify both phone and email.',
        data: {
          email: email,
          phoneVerified: phoneVerified,
          emailVerified: emailVerified,
          requiresVerification: true
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
    const { email, type } = req.body; // type: 'phone' or 'email'

    if (!email || !type) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP type are required'
      });
    }

    // Check for pending user first
    const pendingUserData = OTPService.getPendingUser(email);
    if (pendingUserData) {
      // Resend OTP for pending registration
      if (type === 'phone') {
        const phoneOTP = OTPService.generateOTP();
        OTPService.storeOTP(pendingUserData.phone, phoneOTP);

        try {
          await sendSMS({
            to: pendingUserData.phone,
            message: `Your Nagrik Sewa verification code is: ${phoneOTP}. Valid for 10 minutes.`,
            otp: phoneOTP
          });
        } catch (smsError) {
          console.error('Failed to send SMS OTP:', smsError);
        }

        return res.json({
          success: true,
          message: 'Phone OTP resent successfully'
        });

      } else if (type === 'email') {
        const emailOTP = OTPService.generateOTP();
        OTPService.storeOTP(email, emailOTP);

        try {
          await sendEmail({
            to: email,
            subject: 'Verify Your Nagrik Sewa Account',
            template: 'email-otp',
            data: {
              name: pendingUserData.firstName,
              otp: emailOTP
            }
          });
        } catch (emailError) {
          console.error('Failed to send Email OTP:', emailError);
        }

        return res.json({
          success: true,
          message: 'Email OTP resent successfully'
        });
      }
    }

    // Check for existing user (for post-registration verification)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found. Please register first.'
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
        console.error('Failed to send SMS OTP:', smsError);
      }

      res.json({
        success: true,
        message: 'Phone OTP resent successfully'
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
        console.error('Failed to send Email OTP:', emailError);
      }

      res.json({
        success: true,
        message: 'Email OTP resent successfully'
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
    const { email: rawEmail, password } = req.body;

    console.log('[LOGIN] Attempt received:', {
      rawEmail,
      hasPassword: !!password,
      passwordLength: password?.length
    });

    // Validation
    if (!rawEmail || !password) {
      console.log('[LOGIN] Missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Normalize email: trim whitespace and convert to lowercase
    const email = rawEmail.trim().toLowerCase();
    console.log('[LOGIN] Normalized email:', email);

    // Find user with password field included
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('[LOGIN] User not found with email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('[LOGIN] User found:', {
      id: user._id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      hasPassword: !!user.password,
      passwordHashLength: user.password?.length,
      passwordHashPrefix: user.password?.substring(0, 7) // Shows $2a$12$ or similar
    });

    // Verify password using bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('[LOGIN] Password comparison result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is verified (skip for development or admin accounts)
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isAdmin = user.role === 'admin';
    
    if (!isDevelopment && !isAdmin && (!user.isEmailVerified || !user.isPhoneVerified)) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified. Please verify your email and phone number.',
        data: {
          userId: user._id,
          email: user.email,
          phone: user.phone,
          requiresVerification: true,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        }
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
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
        tokens: {
          accessToken: accessToken
        }
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

// Get current authenticated user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user?.userId || (req as any).user?._id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    const user = await User.findById(userId).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          isDigiLockerVerified: user.isDigiLockerVerified,
          languagePreference: user.languagePreference,
          notificationPreferences: user.notificationPreferences
        }
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data'
    });
  }
});

// Debug endpoint - check if user exists (development only)
router.post('/check-user', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
        exists: false
      });
    }

    res.json({
      success: true,
      exists: true,
      data: {
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        accountStatus: user.accountStatus
      }
    });

  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check user'
    });
  }
});

// Development only - Reset password for testing
router.post('/dev-reset-password', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'This endpoint is only available in development'
      });
    }

    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email and new password are required'
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Set the new password directly - it will be hashed by mongoose pre-save hook
    // Using findOneAndUpdate to bypass the pre-save hook and hash manually
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password directly in database to avoid pre-save hook
    await User.updateOne(
      { email },
      { 
        $set: { 
          password: hashedPassword,
          isEmailVerified: true,
          isPhoneVerified: true
        }
      }
    );

    console.log('[DEV-RESET] Password reset for:', email, 'New hash prefix:', hashedPassword.substring(0, 7));

    res.json({
      success: true,
      message: `Password updated successfully for ${email}`,
      data: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
});

export default router;
