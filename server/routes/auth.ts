import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import { authenticate as authMiddleware } from '../middleware/auth';
import { sendEmail } from '../services/email';
import { sendSMS } from '../services/sms';

const router = express.Router();

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

    // Create user with required address object
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
      accountStatus: 'active'
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
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
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
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
          verificationCode: otp,
          userName: user.firstName,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #10b981;">🇮🇳 Nagrik Sewa Verification</h2>
              <p>Dear ${user.firstName},</p>
              <p>Welcome to Nagrik Sewa! Your verification code is:</p>
              <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 8px;">${otp}</span>
              </div>
              <p><strong>Important:</strong></p>
              <ul>
                <li>This code will expire in 10 minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this code, please ignore this email</li>
              </ul>
              <p>Best regards,<br>Nagrik Sewa Team</p>
            </div>
          `
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
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Verification Code (Resent)</h2>
              <p>Dear ${user.firstName},</p>
              <p>Your new verification code for Nagrik Sewa is:</p>
              <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">${otp}</span>
              </div>
              <p>This code will expire in 10 minutes.</p>
              <p>Best regards,<br>Nagrik Sewa Team</p>
            </div>
          `
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
