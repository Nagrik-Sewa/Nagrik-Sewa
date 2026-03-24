/**
 * Database Seed Script
 * Creates or updates an admin user.
 *
 * Usage:
 * ADMIN_EMAIL=admin@nagriksewa.co.in ADMIN_PASSWORD=<strong-password> npm run db:seed
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nagriksewa.co.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// User Schema (simplified for seeding)
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    phone: String,
    role: { type: String, enum: ['customer', 'worker', 'admin'] },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    isEmailVerified: Boolean,
    isPhoneVerified: Boolean,
    loginAttempts: Number,
    isTwoFactorEnabled: Boolean,
    languagePreference: String,
    notificationPreferences: {
      email: Boolean,
      sms: Boolean,
      push: Boolean,
      whatsapp: Boolean,
    },
    accountStatus: String,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    if (!ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD is required to run this seed script');
    }

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/nagrik-sewa';
    console.log('Connecting to MongoDB...');

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existingAdmin) {
      console.log('Admin user already exists. Updating credentials...');

      await User.updateOne(
        { email: ADMIN_EMAIL.toLowerCase() },
        {
          $set: {
            firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
            lastName: process.env.ADMIN_LAST_NAME || 'User',
            password: hashedPassword,
            role: 'admin',
            isEmailVerified: true,
            isPhoneVerified: true,
            accountStatus: 'active',
          },
        },
      );

      console.log('Admin user updated successfully');
    } else {
      const admin = new User({
        firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
        lastName: process.env.ADMIN_LAST_NAME || 'User',
        email: ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        phone: process.env.ADMIN_PHONE || '9999999999',
        role: 'admin',
        address: {
          street: 'Admin Headquarters',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110001',
          country: 'India',
        },
        isEmailVerified: true,
        isPhoneVerified: true,
        loginAttempts: 0,
        isTwoFactorEnabled: false,
        languagePreference: 'en',
        notificationPreferences: {
          email: true,
          sms: true,
          push: true,
          whatsapp: true,
        },
        accountStatus: 'active',
      });

      await admin.save();
      console.log('Admin user created successfully');
    }

    console.log('\nAdmin account ready');
    console.log(`Email: ${ADMIN_EMAIL.toLowerCase()}`);
    console.log('Password: [provided through ADMIN_PASSWORD env var]');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

seedAdmin();
