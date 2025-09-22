import nodemailer from 'nodemailer';
import emailjs from '@emailjs/nodejs';

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  data?: any;
}

// Nodemailer transporter for production emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
const getEmailTemplate = (template: string, data: any) => {
  const templates = {
    'email-verification': `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Nagrik Sewa! 🇮🇳</h2>
        <p>Hello ${data.name},</p>
        <p>Thank you for registering with Nagrik Sewa. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #6b7280;">${data.verificationLink}</p>
        <p>This link will expire in 24 hours.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't create an account with Nagrik Sewa, please ignore this email.
        </p>
      </div>
    `,
    'email-otp': `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Email Verification - Nagrik Sewa</h2>
        <p>Hello ${data.name},</p>
        <p>Your email verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937;">
            ${data.otp}
          </div>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
      </div>
    `,
    'phone-otp': `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Phone Verification - Nagrik Sewa</h2>
        <p>Hello ${data.name},</p>
        <p>Your phone verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937;">
            ${data.otp}
          </div>
        </div>
        <p>Enter this code in the app to verify your phone number.</p>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `
  };

  return templates[template as keyof typeof templates] || '';
};

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    let htmlContent = options.html;
    
    // Generate HTML from template if provided
    if (options.template && options.data) {
      htmlContent = getEmailTemplate(options.template, options.data);
    }

    // Try Nodemailer first (production)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Nagrik Sewa" <noreply@nagriksewa.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: htmlContent,
      });

      console.log('✅ Email sent via Nodemailer:', info.messageId);
      return { success: true, messageId: info.messageId };
    }

    // Fallback to EmailJS (if configured)
    if (process.env.EMAILJS_PUBLIC_KEY) {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        {
          to_email: options.to,
          subject: options.subject,
          message: options.text || htmlContent?.replace(/<[^>]*>/g, ''),
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
        }
      );

      console.log('✅ Email sent via EmailJS');
      return { success: true };
    }

    // Development fallback - log to console
    console.log('📧 EMAIL NOTIFICATION (Development Mode)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 To:', options.to);
    console.log('📧 Subject:', options.subject);
    
    if (options.data?.otp) {
      console.log('🔢 OTP CODE:', options.data.otp);
    }
    
    if (options.data?.verificationLink) {
      console.log('🔗 Verification Link:', options.data.verificationLink);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return { success: true, messageId: 'dev-mode-' + Date.now() };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};