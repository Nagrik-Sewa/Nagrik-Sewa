import "dotenv/config";
import { database } from "./config/database";
import { User } from "./models/User";

async function createAdminUser() {
  try {
    // Connect to database
    await database.connect();
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'pushkarkumarsaini2006@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Create admin user
    const adminUser = new User({
      firstName: 'Pushkar',
      lastName: 'Saini',
      email: 'pushkarkumarsaini2006@gmail.com',
      password: 'Pushkar1536@', // This will be hashed by the pre-save middleware
      phone: '9876543210', // 10-digit Indian phone number without country code
      role: 'admin',
      accountStatus: 'active',
      isPhoneVerified: true,
      isEmailVerified: true,
      address: {
        street: 'Admin Address',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001'
      }
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully:', adminUser.email);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await database.disconnect();
  }
}

createAdminUser();