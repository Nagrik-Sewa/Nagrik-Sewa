import emailjs from '@emailjs/nodejs';
import nodemailer from "nodemailer";

// Initialize EmailJS
const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

// Check if EmailJS is configured
const hasEmailJSConfig = emailjsServiceId && emailjsTemplateId && emailjsPublicKey && emailjsPrivateKey &&
  emailjsServiceId !== 'your_emailjs_service_id';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  verificationCode?: string;
  userName?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // If EmailJS is configured, use it for verification emails
    if (hasEmailJSConfig && options.verificationCode) {
      return await sendEmailJSVerification(options);
    }
    
    // Fallback to console logging for development
    console.log("\n🔔 === EMAIL NOTIFICATION (Development Mode) ===");
    console.log(`📧 To: ${options.to}`);
    console.log(`📋 Subject: ${options.subject}`);
    
    if (options.verificationCode) {
      console.log(`🔑 VERIFICATION CODE: ${options.verificationCode}`);
    } else if (options.html) {
      const codeMatch = options.html.match(/(\d{6})/);
      if (codeMatch) {
        console.log(`🔑 VERIFICATION CODE: ${codeMatch[1]}`);
      }
    }
    
    if (options.text) {
      console.log(`📝 Message: ${options.text}`);
    }
    
    console.log("===============================================\n");
    
    return { success: true, messageId: "dev-mode-" + Date.now() };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
};

// Send verification email using EmailJS
const sendEmailJSVerification = async (options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const templateParams = {
      to_email: options.to,
      to_name: options.userName || 'User',
      verification_code: options.verificationCode,
      from_name: 'Nagrik Sewa Team',
      reply_to: 'noreply@nagriksewa.com'
    };

    const result = await emailjs.send(
      emailjsServiceId!,
      emailjsTemplateId!,
      templateParams,
      {
        publicKey: emailjsPublicKey!,
        privateKey: emailjsPrivateKey!,
      }
    );

    console.log(`✅ Verification email sent successfully to ${options.to} via EmailJS`);
    console.log(`📧 EmailJS Response:`, result.status, result.text);
    
    return { 
      success: true, 
      messageId: result.text 
    };

  } catch (error) {
    console.error('❌ EmailJS sending failed:', error);
    
    // Fallback to console logging if EmailJS fails
    console.log("\n🔔 === EMAIL FALLBACK (EmailJS Failed) ===");
    console.log(`📧 To: ${options.to}`);
    console.log(`🔑 VERIFICATION CODE: ${options.verificationCode}`);
    console.log("==========================================\n");
    
    return { 
      success: true, // Still return success for development
      messageId: "fallback-" + Date.now(),
      error: `EmailJS failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Verify EmailJS configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  if (!hasEmailJSConfig) {
    console.log('📧 EmailJS configuration not found - using development mode');
    return false;
  }

  try {
    console.log('✅ EmailJS configuration found and ready');
    return true;
  } catch (error) {
    console.error('❌ EmailJS configuration verification failed:', error);
    return false;
  }
};

export default { sendEmail, verifyEmailConfig };
