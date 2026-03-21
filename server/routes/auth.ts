import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import { WorkerProfile } from '../models/WorkerProfile';
import { authenticate as authMiddleware, generateToken, generateRefreshToken } from '../middleware/auth';
import { sendEmail } from '../services/email';
import { database } from '../config/database';
// OTP Service removed - OTP verification disabled
// import { sendSMS } from '../services/sms';
// import { OTPService, PendingUserData } from '../services/otp';

const router = express.Router();

dotenv.config();

const ensureDatabaseAvailable = (res: express.Response): boolean => {
  if (database.getConnectionStatus()) {
    return true;
  }

  res.status(503).json({
    success: false,
    message: 'Database is unavailable. Ensure MongoDB is running and MONGODB_URI is configured.'
  });
  return false;
};

// ============================================================================
// HARDCODED ADMIN CREDENTIALS
// Special admin login - bypasses normal authentication
// This admin account has direct access to the Admin Portal
// ============================================================================
const HARDCODED_ADMIN = {
  email: 'admin@nagriksewa.co.in',
  password: 'Developer@NagrikSewa1536',
  role: 'admin' as const,
  firstName: 'System',
  lastName: 'Administrator',
  isSystemAdmin: true // Flag to identify hardcoded admin
};

// Validate JWT_SECRET at startup
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ WARNING: JWT_SECRET not set in environment variables');
}

// ============================================================================
// HELPER: Check if credentials match hardcoded admin
// ============================================================================
const isHardcodedAdmin = (email: string, password: string): boolean => {
  return email.toLowerCase().trim() === HARDCODED_ADMIN.email && password === HARDCODED_ADMIN.password;
};

// ============================================================================
// HELPER: Generate admin token for hardcoded admin
// ============================================================================
const generateHardcodedAdminToken = (): string => {
  const payload = {
    userId: 'system-admin-001',
    email: HARDCODED_ADMIN.email,
    role: HARDCODED_ADMIN.role,
    isSystemAdmin: true
  };
  return jwt.sign(payload, JWT_SECRET || 'fallback-secret', { expiresIn: '24h' });
};

// Admin registration endpoint (one-time setup)
router.post('/register-admin', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    console.log('[ADMIN-REGISTER] Request received:', { email });

    // Security: Only allow specific admin email
    if (email !== 'pushkarkumarsaini2006@gmail.com') {
      console.log('[ADMIN-REGISTER] Unauthorized attempt:', { email });
      return res.status(403).json({
        success: false,
        message: 'Unauthorized admin registration attempt'
      });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      console.log('[ADMIN-REGISTER] Admin already exists');
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // NOTE: Do NOT hash password here - the User model pre-save hook handles hashing

    // Normalize phone number (remove country code if present)
    let normalizedPhone = phone || '9999999999';
    if (normalizedPhone.startsWith('+91')) {
      normalizedPhone = normalizedPhone.substring(3);
    } else if (normalizedPhone.startsWith('91')) {
      normalizedPhone = normalizedPhone.substring(2);
    }

    // Create admin user - password will be hashed by model's pre-save middleware
    const admin = new User({
      firstName: firstName || 'Pushkar',
      lastName: lastName || 'Saini',
      email: 'pushkarkumarsaini2006@gmail.com',
      password, // Plain password - model will hash it
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
    console.log('[ADMIN-REGISTER] Admin created successfully:', { userId: admin._id });

    // Generate JWT token using centralized function
    const token = generateToken(admin);

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
// OTP VERIFICATION REMOVED - Users are registered directly without OTP
router.post('/register', async (req, res) => {
  try {
    if (!ensureDatabaseAvailable(res)) {
      return;
    }

    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      role = 'customer',
      // Worker-specific fields
      district,
      primarySkill,
      experience
    } = req.body;

    console.log('[REGISTER] Request received:', { email: email?.toLowerCase(), phone, firstName, role });

    // Prevent registration with hardcoded admin email
    if (email?.toLowerCase().trim() === HARDCODED_ADMIN.email) {
      console.log('[REGISTER] Attempted registration with admin email blocked');
      return res.status(403).json({
        success: false,
        message: 'This email is reserved for system administration'
      });
    }

    // Validation - check all required fields
    if (!firstName || !email || !password || !phone) {
      console.log('[REGISTER] Missing required fields:', { 
        hasFirstName: !!firstName, 
        hasEmail: !!email, 
        hasPassword: !!password, 
        hasPhone: !!phone 
      });
      return res.status(400).json({
        success: false,
        message: 'First name, email, password, and phone are required'
      });
    }

    // Validate password strength
    if (password.length < 8) {
      console.log('[REGISTER] Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      console.log('[REGISTER] Invalid email format:', normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Normalize phone number (remove country code and spaces if present)
    let normalizedPhone = phone.toString().trim();
    if (normalizedPhone.startsWith('+91')) {
      normalizedPhone = normalizedPhone.substring(3).trim();
    } else if (normalizedPhone.startsWith('91') && normalizedPhone.length > 10) {
      normalizedPhone = normalizedPhone.substring(2).trim();
    }
    // Remove any remaining spaces or special characters
    normalizedPhone = normalizedPhone.replace(/[\s\-()]/g, '');

    // Validate phone format (10-digit Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      console.log('[REGISTER] Invalid phone format:', normalizedPhone);
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number'
      });
    }

    // Check if user already exists in database
    const existingUser = await User.findOne({ 
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }] 
    });

    if (existingUser) {
      const isEmailMatch = existingUser.email === normalizedEmail;
      const isPhoneMatch = existingUser.phone === normalizedPhone;
      console.log('[REGISTER] User already exists:', { isEmailMatch, isPhoneMatch });
      return res.status(400).json({
        success: false,
        message: isEmailMatch 
          ? 'An account with this email already exists' 
          : 'An account with this phone number already exists'
      });
    }

    // ========================================================================
    // USER CREATION WITH EMAIL OTP VERIFICATION
    // Users must verify their email via OTP before account is fully activated
    // Mobile OTP has been removed - only email verification is required
    // ========================================================================

    // Create user in database (email verification required)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName?.trim() || '',
      email: normalizedEmail,
      password: hashedPassword,
      phone: normalizedPhone,
      role,
      address: {
        city: district || 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India'
      },
      // Email verification required via OTP
      isEmailVerified: false,
      // Phone verification disabled (mobile OTP removed)
      isPhoneVerified: true,
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
    console.log('[REGISTER] User created successfully:', user._id);

    // Create worker profile if user is a worker
    if (role === 'worker' && district && primarySkill) {
      try {
        // Parse experience to number
        let experienceYears = 0;
        if (experience) {
          if (experience.includes('+')) {
            experienceYears = parseInt(experience);
          } else if (experience.includes('-')) {
            const [min] = experience.split('-');
            experienceYears = parseInt(min);
          }
        }

        const workerProfile = new WorkerProfile({
          userId: user._id,
          description: `${primarySkill} with ${experience || '0-1'} years of experience`,
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
            backgroundCheck: { status: 'pending' },
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
        console.log('[REGISTER] Worker profile created for user:', user._id);
      } catch (profileError: any) {
        console.error('[REGISTER] Error creating worker profile:', profileError);
        // Don't fail registration if profile creation fails
      }
    }

    // ========================================================================
    // EMAIL OTP GENERATION AND SENDING
    // Generate OTP and send verification email to user
    // ========================================================================
    
    // Step 1: Generate email OTP
    console.log('[REGISTER] Step 1: Generating email OTP for:', normalizedEmail);
    const emailOTP = user.generateEmailOTP();
    console.log('[REGISTER] Email OTP generated successfully:', { 
      email: normalizedEmail, 
      otpLength: emailOTP.length,
      expiresAt: user.emailOTPExpiry 
    });
    
    // Step 2: Save user with OTP data
    console.log('[REGISTER] Step 2: Persisting user with OTP to database...');
    await user.save();
    console.log('[REGISTER] User and OTP persisted successfully:', { userId: user._id });
    
    // Step 3: Send verification email with OTP
    console.log('[REGISTER] Step 3: Sending verification email...');
    let emailSent = false;
    let emailError: any = null;
    
    try {
      const emailResult = await sendEmail({
        to: user.email,
        subject: 'Verify Your Email - Nagrik Sewa OTP 🔐',
        template: 'email-otp',
        data: {
          name: user.firstName,
          otp: emailOTP,
          expiresIn: '10 minutes'
        }
      });
      
      emailSent = emailResult.success;
      console.log('[REGISTER] Email send result:', {
        success: emailResult.success,
        messageId: emailResult.messageId,
        recipient: user.email
      });
      
      if (!emailResult.success) {
        emailError = emailResult.error;
        console.error('[REGISTER] Email sending returned failure:', emailResult.error);
      }
    } catch (err) {
      emailError = err;
      console.error('[REGISTER] Email sending threw exception:', err);
      // Log OTP for manual verification in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('[REGISTER] DEV MODE - OTP for manual verification:', emailOTP);
      }
    }
    
    // Step 4: Return response (don't generate token yet - user must verify email first)
    console.log('[REGISTER] Step 4: Registration complete, awaiting email verification');

    res.status(201).json({
      success: true,
      message: emailSent 
        ? 'Registration successful! Please check your email for the verification OTP.'
        : 'Registration successful! Verification email could not be sent. Please use resend OTP.',
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
        requiresVerification: true,
        emailSent: emailSent
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

// ============================================================================
// EMAIL OTP VERIFICATION ENDPOINTS
// Mobile OTP has been removed - only email verification is required
// ============================================================================

/**
 * Verify Email OTP
 * POST /auth/verify-email-otp
 * Verifies the email OTP and activates the user account
 */
router.post('/verify-email-otp', async (req, res) => {
  try {
    if (!ensureDatabaseAvailable(res)) {
      return;
    }

    const { email: rawEmail, otp } = req.body;
    const email = rawEmail?.trim().toLowerCase();

    console.log('[VERIFY-EMAIL-OTP] Request received:', { email, hasOTP: !!otp });

    // Validate input
    if (!email || !otp) {
      console.log('[VERIFY-EMAIL-OTP] Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user by email
    console.log('[VERIFY-EMAIL-OTP] Looking up user...');
    const user = await User.findOne({ email });

    if (!user) {
      console.log('[VERIFY-EMAIL-OTP] User not found:', email);
      return res.status(404).json({
        success: false,
        message: 'User not found. Please register first.'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      console.log('[VERIFY-EMAIL-OTP] Email already verified:', email);
      return res.status(400).json({
        success: false,
        message: 'Email is already verified. Please login.'
      });
    }

    // Verify OTP matches
    console.log('[VERIFY-EMAIL-OTP] Verifying OTP...');
    if (!user.emailVerificationOTP || user.emailVerificationOTP !== otp) {
      console.log('[VERIFY-EMAIL-OTP] Invalid OTP:', { 
        provided: otp, 
        expected: user.emailVerificationOTP ? '[SET]' : '[NOT SET]' 
      });
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      });
    }

    // Check if OTP has expired
    if (!user.emailOTPExpiry || user.emailOTPExpiry < new Date()) {
      console.log('[VERIFY-EMAIL-OTP] OTP expired:', { 
        expiry: user.emailOTPExpiry, 
        now: new Date() 
      });
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Mark email as verified and clear OTP data
    console.log('[VERIFY-EMAIL-OTP] OTP valid, marking email as verified...');
    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailOTPExpiry = undefined;
    user.accountStatus = 'active';
    await user.save();
    console.log('[VERIFY-EMAIL-OTP] Email verified successfully:', { userId: user._id });

    // Generate tokens after successful verification
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Send welcome email after verification
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to Nagrik Sewa - Account Verified! 🇮🇳',
        template: 'welcome',
        data: {
          name: user.firstName,
          email: user.email,
          dashboardLink: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/dashboard` : 'https://nagriksewa.co.in/dashboard'
        }
      });
      console.log('[VERIFY-EMAIL-OTP] Welcome email sent to:', user.email);
    } catch (emailError) {
      console.error('[VERIFY-EMAIL-OTP] Failed to send welcome email:', emailError);
      // Don't fail verification if welcome email fails
    }

    res.json({
      success: true,
      message: 'Email verified successfully! Welcome to Nagrik Sewa.',
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
        token: accessToken,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    console.error('[VERIFY-EMAIL-OTP] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Resend Email OTP
 * POST /auth/resend-email-otp
 * Generates and sends a new email OTP
 */
router.post('/resend-email-otp', async (req, res) => {
  try {
    if (!ensureDatabaseAvailable(res)) {
      return;
    }

    const { email: rawEmail } = req.body;
    const email = rawEmail?.trim().toLowerCase();

    console.log('[RESEND-EMAIL-OTP] Request received:', { email });

    // Validate input
    if (!email) {
      console.log('[RESEND-EMAIL-OTP] Missing email');
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user by email
    console.log('[RESEND-EMAIL-OTP] Looking up user...');
    const user = await User.findOne({ email });

    if (!user) {
      console.log('[RESEND-EMAIL-OTP] User not found:', email);
      return res.status(404).json({
        success: false,
        message: 'User not found. Please register first.'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      console.log('[RESEND-EMAIL-OTP] Email already verified:', email);
      return res.status(400).json({
        success: false,
        message: 'Email is already verified. Please login.'
      });
    }

    // Generate new OTP
    console.log('[RESEND-EMAIL-OTP] Generating new OTP...');
    const emailOTP = user.generateEmailOTP();
    await user.save();
    console.log('[RESEND-EMAIL-OTP] New OTP generated and saved:', { 
      email, 
      expiresAt: user.emailOTPExpiry 
    });

    // Send verification email with new OTP
    console.log('[RESEND-EMAIL-OTP] Sending verification email...');
    let emailSent = false;
    
    try {
      const emailResult = await sendEmail({
        to: email,
        subject: 'Your New Verification Code - Nagrik Sewa 🔑',
        template: 'email-otp',
        data: {
          name: user.firstName,
          otp: emailOTP,
          expiresIn: '10 minutes'
        }
      });
      
      emailSent = emailResult.success;
      console.log('[RESEND-EMAIL-OTP] Email send result:', {
        success: emailResult.success,
        messageId: emailResult.messageId
      });
      
      if (!emailResult.success) {
        console.error('[RESEND-EMAIL-OTP] Email sending returned failure:', emailResult.error);
      }
    } catch (emailError) {
      console.error('[RESEND-EMAIL-OTP] Email sending threw exception:', emailError);
      // Log OTP for manual verification in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('[RESEND-EMAIL-OTP] DEV MODE - OTP for manual verification:', emailOTP);
      }
    }

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again later.'
      });
    }

    res.json({
      success: true,
      message: 'New OTP sent successfully to your email'
    });
  } catch (error) {
    console.error('[RESEND-EMAIL-OTP] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ============================================================================
// LEGACY PHONE OTP ENDPOINT (DISABLED)
// Mobile OTP verification has been removed from the system
// ============================================================================
router.post('/send-otp', async (req, res) => {
  console.log('[SEND-OTP] Legacy phone OTP endpoint called - this is disabled');
  return res.status(410).json({
    success: false,
    message: 'Phone OTP verification has been disabled. Please use email verification.'
  });
});

// Login endpoint
// MODIFIED: Added hardcoded admin credential check
router.post('/login', async (req, res) => {
  try {
    if (!ensureDatabaseAvailable(res)) {
      return;
    }

    const { email, password } = req.body;

    // Debug logging for request
    console.log('[LOGIN] Request received:', { email: email?.toLowerCase(), hasPassword: !!password });

    // Validation
    if (!email || !password) {
      console.log('[LOGIN] Missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Normalize email to lowercase for case-insensitive matching
    const normalizedEmail = email.toLowerCase().trim();

    // ========================================================================
    // HARDCODED ADMIN LOGIN CHECK
    // This special admin bypasses normal user authentication
    // ========================================================================
    if (isHardcodedAdmin(normalizedEmail, password)) {
      console.log('[LOGIN] Hardcoded admin login successful');
      
      const adminToken = generateHardcodedAdminToken();
      
      return res.status(200).json({
        success: true,
        message: 'Admin login successful',
        data: {
          user: {
            id: 'system-admin-001',
            _id: 'system-admin-001',
            firstName: HARDCODED_ADMIN.firstName,
            lastName: HARDCODED_ADMIN.lastName,
            email: HARDCODED_ADMIN.email,
            phone: '0000000000',
            role: HARDCODED_ADMIN.role,
            avatar: null,
            isEmailVerified: true,
            isPhoneVerified: true,
            isSystemAdmin: true // Flag to identify this as the hardcoded admin
          },
          tokens: {
            accessToken: adminToken,
            refreshToken: adminToken
          },
          token: adminToken
        }
      });
    }

    // ========================================================================
    // NORMAL USER LOGIN
    // ========================================================================

    // Find user with password field included
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    console.log('[LOGIN] User lookup:', { found: !!user, email: normalizedEmail });
    
    if (!user) {
      console.log('[LOGIN] User not found for email:', normalizedEmail);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is blocked
    if (user.isBlocked) {
      console.log('[LOGIN] Account blocked:', { userId: user._id, reason: user.blockReason });
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Please contact support.'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      console.log('[LOGIN] Account inactive:', { userId: user._id });
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Check account status
    if (user.accountStatus === 'suspended') {
      console.log('[LOGIN] Account suspended:', { userId: user._id });
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.'
      });
    }

    // Check if account is locked due to failed attempts
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
      console.log('[LOGIN] Account locked:', { userId: user._id, remainingMinutes: remainingTime });
      return res.status(423).json({
        success: false,
        message: `Account locked due to too many failed attempts. Try again in ${remainingTime} minutes.`
      });
    }

    // Verify password using model method if available, otherwise use bcrypt directly
    let isPasswordValid = false;
    if (typeof user.comparePassword === 'function') {
      isPasswordValid = await user.comparePassword(password);
    } else {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }
    
    console.log('[LOGIN] Password verification:', { valid: isPasswordValid, userId: user._id });
    
    if (!isPasswordValid) {
      // Increment login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000); // Lock for 2 hours
        console.log('[LOGIN] Account locked after 5 failed attempts:', { userId: user._id });
      }
      await user.save();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Reset login attempts on successful password
    if (user.loginAttempts > 0 || user.lockUntil) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
    }

    // ========================================================================
    // OTP VERIFICATION CHECK REMOVED
    // Users are no longer required to verify email/phone before login
    // The following check has been disabled:
    // if (user.role !== 'admin' && (!user.isEmailVerified || !user.isPhoneVerified))
    // ========================================================================

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Validate JWT_SECRET before token generation
    if (!process.env.JWT_SECRET) {
      console.error('[LOGIN] JWT_SECRET not configured');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact support.'
      });
    }

    // Generate access token using centralized function
    const accessToken = generateToken(user);

    // Generate refresh token using centralized function
    const refreshToken = generateRefreshToken(user);

    console.log('[LOGIN] Success:', { userId: user._id, role: user.role });

    // Response structure matches what frontend expects: data.user and data.tokens.accessToken
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        },
        tokens: {
          accessToken,
          refreshToken
        },
        token: accessToken // Backward compatibility
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

// Get current authenticated user
// MODIFIED: Added support for hardcoded admin
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user?.userId || (req as any).user?._id;
    const isSystemAdmin = (req as any).user?.isSystemAdmin;
    
    // ========================================================================
    // HARDCODED ADMIN /me ENDPOINT SUPPORT
    // ========================================================================
    if (isSystemAdmin || userId === 'system-admin-001') {
      console.log('[AUTH-ME] Returning hardcoded admin user data');
      return res.json({
        success: true,
        data: {
          user: {
            _id: 'system-admin-001',
            firstName: HARDCODED_ADMIN.firstName,
            lastName: HARDCODED_ADMIN.lastName,
            email: HARDCODED_ADMIN.email,
            phone: '0000000000',
            role: HARDCODED_ADMIN.role,
            avatar: null,
            isEmailVerified: true,
            isPhoneVerified: true,
            isDigiLockerVerified: false,
            languagePreference: 'en',
            notificationPreferences: {
              email: true,
              sms: false,
              push: true,
              whatsapp: false
            },
            isSystemAdmin: true
          }
        }
      });
    }
    
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
