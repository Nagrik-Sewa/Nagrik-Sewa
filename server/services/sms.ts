import twilio from 'twilio';

// Only initialize Twilio client if credentials are properly configured
const client = process.env.TWILIO_ACCOUNT_SID && 
                process.env.TWILIO_AUTH_TOKEN &&
                process.env.TWILIO_ACCOUNT_SID.startsWith('AC')
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export interface SMSOptions {
  to: string;
  message: string;
  otp?: string;
}

export const sendSMS = async (options: SMSOptions): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // Format phone number to include country code if not present
    let phoneNumber = options.to;
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+91' + phoneNumber; // Default to India country code
    }

    // Try Twilio if configured
    if (client && process.env.TWILIO_PHONE_NUMBER) {
      const message = await client.messages.create({
        body: options.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      console.log(' SMS sent via Twilio:', message.sid);
      return { success: true, messageId: message.sid };
    }

    // Development fallback - log to console
    console.log(' SMS NOTIFICATION (Development Mode)');
    console.log('');
    console.log(' To:', phoneNumber);
    console.log(' Message:', options.message);
    
    if (options.otp) {
      console.log(' OTP CODE:', options.otp);
    }
    
    console.log('');
    
    return { success: true, messageId: 'dev-mode-sms-' + Date.now() };

  } catch (error) {
    console.error(' SMS sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Template for OTP SMS
export const sendOTPSMS = async (phoneNumber: string, otp: string, name?: string): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const message = `Hello${name ? ' ' + name : ''}! Your Nagrik Sewa verification code is: ${otp}. This code expires in 10 minutes. Do not share this code with anyone.`;
  
  return sendSMS({
    to: phoneNumber,
    message,
    otp
  });
};

// Booking notification SMS
export const sendBookingNotificationSMS = async (phoneNumber: string, bookingDetails: any): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const message = `Nagrik Sewa: Your booking #${bookingDetails.id} has been confirmed. Service: ${bookingDetails.service}. Date: ${bookingDetails.date}. Contact: ${bookingDetails.workerPhone}`;
  
  return sendSMS({
    to: phoneNumber,
    message
  });
};
