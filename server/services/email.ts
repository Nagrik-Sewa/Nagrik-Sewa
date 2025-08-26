import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

interface EmailOptions {
  to: string;
  subject: string;
  template?: string;
  html?: string;
  text?: string;
  data?: any;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// Email templates
const emailTemplates = {
  'email-verification': {
    subject: 'Verify your email - Nagrik Sewa',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Email Verification</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
          }
          .content { 
            background: white; 
            padding: 30px; 
            border: 1px solid #ddd; 
            border-radius: 0 0 10px 10px; 
          }
          .button { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 12px; 
            margin-top: 30px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to Nagrik Sewa!</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}},</h2>
          <p>Thank you for joining Nagrik Sewa - India's trusted home services platform!</p>
          <p>To complete your registration and verify your email address, please click the button below:</p>
          <a href="{{verificationLink}}" class="button">Verify Email Address</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="{{verificationLink}}">{{verificationLink}}</a></p>
          <p>This verification link will expire in 24 hours.</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
          <p>Best regards,<br>The Nagrik Sewa Team</p>
        </div>
        <div class="footer">
          <p>© 2025 Nagrik Sewa. All rights reserved.</p>
          <p>Building India's Digital Service Economy</p>
        </div>
      </body>
      </html>
    `
  },

  'password-reset': {
    subject: 'Password Reset - Nagrik Sewa',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Password Reset</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
          }
          .content { 
            background: white; 
            padding: 30px; 
            border: 1px solid #ddd; 
            border-radius: 0 0 10px 10px; 
          }
          .button { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .warning { 
            background: #fff3cd; 
            border: 1px solid #ffeaa7; 
            padding: 15px; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 12px; 
            margin-top: 30px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}},</h2>
          <p>We received a request to reset your password for your Nagrik Sewa account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="{{resetLink}}" class="button">Reset Password</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="{{resetLink}}">{{resetLink}}</a></p>
          <div class="warning">
            <strong>Security Notice:</strong>
            <ul>
              <li>This reset link will expire in 1 hour</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          <p>Best regards,<br>The Nagrik Sewa Team</p>
        </div>
        <div class="footer">
          <p>© 2025 Nagrik Sewa. All rights reserved.</p>
          <p>If you have questions, contact us at support@nagrik-sewa.com</p>
        </div>
      </body>
      </html>
    `
  },

  'booking-confirmation': {
    subject: 'Booking Confirmed - Nagrik Sewa',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Booking Confirmation</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
          }
          .content { 
            background: white; 
            padding: 30px; 
            border: 1px solid #ddd; 
            border-radius: 0 0 10px 10px; 
          }
          .booking-details { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            margin: 10px 0; 
            padding: 5px 0; 
            border-bottom: 1px solid #eee; 
          }
          .button { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 12px; 
            margin-top: 30px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hello {{customerName}},</h2>
          <p>Great news! Your booking has been confirmed.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>{{bookingId}}</span>
            </div>
            <div class="detail-row">
              <span><strong>Service:</strong></span>
              <span>{{serviceName}}</span>
            </div>
            <div class="detail-row">
              <span><strong>Worker:</strong></span>
              <span>{{workerName}}</span>
            </div>
            <div class="detail-row">
              <span><strong>Date & Time:</strong></span>
              <span>{{dateTime}}</span>
            </div>
            <div class="detail-row">
              <span><strong>Address:</strong></span>
              <span>{{address}}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Amount:</strong></span>
              <span>₹{{totalAmount}}</span>
            </div>
          </div>

          <a href="{{bookingLink}}" class="button">View Booking</a>
          
          <p>Your assigned worker will contact you shortly. You can track your booking and communicate with the worker through our app.</p>
          
          <p>Best regards,<br>The Nagrik Sewa Team</p>
        </div>
        <div class="footer">
          <p>© 2025 Nagrik Sewa. All rights reserved.</p>
          <p>Need help? Contact us at support@nagrik-sewa.com</p>
        </div>
      </body>
      </html>
    `
  }
};

// Replace template variables
const replaceTemplateVariables = (template: string, data: any): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || match;
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    let htmlContent = options.html;
    let subject = options.subject;

    // Use template if specified
    if (options.template && emailTemplates[options.template as keyof typeof emailTemplates]) {
      const template = emailTemplates[options.template as keyof typeof emailTemplates];
      htmlContent = replaceTemplateVariables(template.html, options.data || {});
      subject = template.subject;
    }

    const mailOptions = {
      from: `"Nagrik Sewa" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject,
      html: htmlContent,
      text: options.text,
      attachments: options.attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✅ Email server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
};

// Send bulk emails
export const sendBulkEmails = async (emails: EmailOptions[]): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> => {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[]
  };

  for (const email of emails) {
    try {
      await sendEmail(email);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push(`Failed to send to ${email.to}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
};
