import "dotenv/config";
import { database } from "./config/database";
import { User } from "./models/User";

async function testLogin() {
  try {
    // Connect to database
    await database.connect();
    console.log('Connected to database');

    const email = 'pushkarkumarsaini2006@gmail.com';
    const password = 'Pushkar1536@';

    console.log('Finding user with email:', email);
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accountStatus: user.accountStatus,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified
    });

    // Test password comparison
    const bcrypt = await import("bcryptjs");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (isPasswordValid) {
      console.log('🎉 Login would be successful!');
    } else {
      console.log('❌ Invalid password');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await database.disconnect();
  }
}

testLogin();