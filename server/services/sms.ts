import twilioClient from 'twilio';

// Twilio configuration
const twilio = twilioClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SMSOptions {
  to: string;
  message: string;
  from?: string;
}

export const sendSMS = async (options: SMSOptions): Promise<void> => {
  try {
    // If Twilio is not configured, use mock/console logging for development
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('📱 SMS (Mock):', {
        to: options.to,
        message: options.message
      });
      return;
    }

        const message = await twilio.messages.create({
      body: options.message,
      from: options.from || process.env.TWILIO_PHONE_NUMBER,
      to: `+91${options.to}` // Add India country code
    });

    console.log('SMS sent successfully:', message.sid);
  } catch (error) {
    console.error('SMS send error:', error);
    
    // For development, don't throw errors if SMS fails
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 SMS (Fallback):', {
        to: options.to,
        message: options.message
      });
      return;
    }
    
    throw new Error('Failed to send SMS');
  }
};

// Send OTP SMS
export const sendOTPSMS = async (phone: string, otp: string): Promise<void> => {
  const message = `Your Nagrik Sewa verification code is: ${otp}. Valid for 10 minutes. Do not share with anyone.`;
  await sendSMS({ to: phone, message });
};

// Send booking notification SMS
export const sendBookingNotificationSMS = async (
  phone: string, 
  bookingId: string, 
  serviceName: string,
  dateTime: string
): Promise<void> => {
  const message = `Booking confirmed! Booking ID: ${bookingId}. Service: ${serviceName} on ${dateTime}. Track at nagrik-sewa.com`;
  await sendSMS({ to: phone, message });
};

// Send worker notification SMS
export const sendWorkerNotificationSMS = async (
  phone: string,
  message: string
): Promise<void> => {
  await sendSMS({ to: phone, message });
};

// Verify SMS configuration
export const verifySMSConfig = (): boolean => {
  const hasConfig = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN);
  
  if (hasConfig) {
    console.log('✅ SMS service is configured');
  } else {
    console.log('⚠️ SMS service not configured - using mock mode');
  }
  
  return hasConfig;
};

// Bulk SMS sending
export const sendBulkSMS = async (messages: SMSOptions[]): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> => {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[]
  };

  for (const sms of messages) {
    try {
      await sendSMS(sms);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push(`Failed to send to ${sms.to}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
};
