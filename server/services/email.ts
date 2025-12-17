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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header with Indian flag colors -->
                <tr>
                  <td style="background: linear-gradient(135deg, #FF9933 0%, #138808 50%, #000080 100%); padding: 3px 0;"></td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #138808; font-size: 28px; font-weight: bold;">
                      🇮🇳 नागरिक सेवा
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Connecting Communities, Building Trust
                    </p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #138808; font-size: 24px; font-weight: 600;">
                      Welcome to Nagrik Sewa! 🎉
                    </h2>
                    <p style="margin: 0 0 15px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                      Hello <strong>${data.name}</strong>,
                    </p>
                    <p style="margin: 0 0 25px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                      Thank you for joining Nagrik Sewa! We're excited to have you on board. Please verify your email address to unlock all features and start your journey with us.
                    </p>
                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${data.verificationLink}" style="display: inline-block; background: linear-gradient(135deg, #138808 0%, #0d6006 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(19, 136, 8, 0.3);">
                            ✓ Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 10px 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                      Or copy and paste this link in your browser:
                    </p>
                    <p style="margin: 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; word-break: break-all; color: #138808; font-size: 13px; font-family: monospace;">
                      ${data.verificationLink}
                    </p>
                    <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fff5eb 0%, #ffe8d1 100%); border-left: 4px solid #FF9933; border-radius: 8px;">
                      <p style="margin: 0; color: #92400e; font-size: 14px;">
                        ⏱️ <strong>Important:</strong> This verification link will expire in 24 hours.
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px;">
                      If you didn't create an account with Nagrik Sewa, please ignore this email.
                    </p>
                    <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 12px;">
                      © ${new Date().getFullYear()} Nagrik Sewa. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    'email-otp': `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header with Indian flag colors -->
                <tr>
                  <td style="background: linear-gradient(135deg, #FF9933 0%, #138808 50%, #000080 100%); padding: 3px 0;"></td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #138808; font-size: 28px; font-weight: bold;">
                      🇮🇳 नागरिक सेवा
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Secure Email Verification
                    </p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center;">
                    <div style="margin-bottom: 30px;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #138808 0%, #0d6006 100%); border-radius: 50%; padding: 20px; margin-bottom: 20px;">
                        <span style="font-size: 40px;">🔐</span>
                      </div>
                    </div>
                    <h2 style="margin: 0 0 15px 0; color: #138808; font-size: 24px; font-weight: 600;">
                      Email Verification Code
                    </h2>
                    <p style="margin: 0 0 30px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                      Hello <strong>${data.name}</strong>,
                    </p>
                    <p style="margin: 0 0 30px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                      Enter this verification code to confirm your email address:
                    </p>
                    <!-- OTP Display -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                          <div style="display: inline-block; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 3px solid #138808; border-radius: 12px; padding: 25px 40px; box-shadow: 0 8px 20px rgba(19, 136, 8, 0.15);">
                            <div style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #138808; font-family: 'Courier New', monospace;">
                              ${data.otp}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Info Box -->
                    <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #fff5eb 0%, #ffe8d1 100%); border-left: 4px solid #FF9933; border-radius: 8px; text-align: left;">
                      <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">
                        ⚡ Quick Tips:
                      </p>
                      <p style="margin: 0 0 5px 0; color: #92400e; font-size: 13px;">
                        • This code expires in <strong>10 minutes</strong>
                      </p>
                      <p style="margin: 0; color: #92400e; font-size: 13px;">
                        • Never share this code with anyone
                      </p>
                    </div>
                    <div style="margin-top: 25px; padding: 20px; background-color: #fef2f2; border-radius: 8px; text-align: left;">
                      <p style="margin: 0; color: #991b1b; font-size: 13px;">
                        🛡️ <strong>Security Notice:</strong> If you didn't request this verification, please ignore this email and ensure your account is secure.
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px;">
                      This is an automated message from Nagrik Sewa
                    </p>
                    <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 12px;">
                      © ${new Date().getFullYear()} Nagrik Sewa. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    'phone-otp': `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header with Indian flag colors -->
                <tr>
                  <td style="background: linear-gradient(135deg, #FF9933 0%, #138808 50%, #000080 100%); padding: 3px 0;"></td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #138808; font-size: 28px; font-weight: bold;">
                      🇮🇳 नागरिक सेवा
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Secure Phone Verification
                    </p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center;">
                    <div style="margin-bottom: 30px;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #FF9933 0%, #ff7e0d 100%); border-radius: 50%; padding: 20px; margin-bottom: 20px;">
                        <span style="font-size: 40px;">📱</span>
                      </div>
                    </div>
                    <h2 style="margin: 0 0 15px 0; color: #138808; font-size: 24px; font-weight: 600;">
                      Phone Verification Code
                    </h2>
                    <p style="margin: 0 0 30px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                      Hello <strong>${data.name}</strong>,
                    </p>
                    <p style="margin: 0 0 30px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                      Enter this verification code in the app to verify your phone number:
                    </p>
                    <!-- OTP Display -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 0 0 30px 0;">
                          <div style="display: inline-block; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: 3px solid #FF9933; border-radius: 12px; padding: 25px 40px; box-shadow: 0 8px 20px rgba(255, 153, 51, 0.15);">
                            <div style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #ea580c; font-family: 'Courier New', monospace;">
                              ${data.otp}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Info Box -->
                    <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #138808; border-radius: 8px; text-align: left;">
                      <p style="margin: 0 0 8px 0; color: #14532d; font-size: 14px; font-weight: 600;">
                        ⚡ Quick Tips:
                      </p>
                      <p style="margin: 0 0 5px 0; color: #14532d; font-size: 13px;">
                        • This code expires in <strong>10 minutes</strong>
                      </p>
                      <p style="margin: 0; color: #14532d; font-size: 13px;">
                        • Never share this code with anyone
                      </p>
                    </div>
                    <div style="margin-top: 25px; padding: 20px; background-color: #fef2f2; border-radius: 8px; text-align: left;">
                      <p style="margin: 0; color: #991b1b; font-size: 13px;">
                        🛡️ <strong>Security Notice:</strong> If you didn't request this verification, please ignore this email and ensure your account is secure.
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px;">
                      This is an automated message from Nagrik Sewa
                    </p>
                    <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 12px;">
                      © ${new Date().getFullYear()} Nagrik Sewa. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
    console.log('📧 Email sent successfully');
    
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