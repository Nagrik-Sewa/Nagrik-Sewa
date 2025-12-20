/**
 * Database Seed Script
 * Creates the admin user with predefined credentials
 * 
 * Usage: npm run db:seed
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin credentials
const ADMIN_EMAIL = 'admin@nagriksewa.co.in';
const ADMIN_PASSWORD = 'Developer@NagrikSewa1536';

// User Schema (simplified for seeding)
const userSchema = new mongoose.Schema({
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
    country: String
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
    whatsapp: Boolean
  },
  accountStatus: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/nagrik-sewa';
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Updating password...');
      
      // Update existing admin's password and name
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await User.updateOne(
        { email: ADMIN_EMAIL },
        { 
          $set: { 
            firstName: 'Pushkar',
            lastName: 'Saini',
            password: hashedPassword,
            role: 'admin',
            isEmailVerified: true,
            isPhoneVerified: true,
            accountStatus: 'active'
          }
        }
      );
      
      console.log('✅ Admin password updated successfully!');
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      
      const admin = new User({
        firstName: 'Pushkar',
        lastName: 'Saini',
        email: ADMIN_EMAIL,
        password: hashedPassword,
        phone: '9999999999',
        role: 'admin',
        address: {
          street: 'Admin Headquarters',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110001',
          country: 'India'
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
          whatsapp: true
        },
        accountStatus: 'active'
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n📋 Admin Credentials:');
    console.log('   Email:', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD);
    console.log('\n🔐 Use these credentials to login at /admin');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedAdmin();
