# EmailJS Setup Guide for Nagrik Sewa

This guide will help you set up EmailJS to send verification emails in the Nagrik Sewa application.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Services**
2. Click **Add Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Fill in your email credentials:
   - **Service ID**: Give it a name like `nagrik_sewa_service`
   - **Email**: Your email address
   - **Password**: Use an App Password (not your regular password)

### For Gmail App Password:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > 2-Step Verification > App Passwords
4. Generate a new app password for "Mail"
5. Use this 16-character password in EmailJS

## Step 3: Create Email Template

1. In EmailJS dashboard, go to **Templates**
2. Click **Create New Template**
3. Set Template ID: `nagrik_sewa_verification`
4. Use this template:

```html
Subject: Verify Your Nagrik Sewa Account 🇮🇳

Hello {{to_name}},

Welcome to Nagrik Sewa! Please verify your email address to complete your registration.

Your verification code is: {{verification_code}}

This code will expire in 10 minutes.

Best regards,
{{from_name}}

---
© 2025 Nagrik Sewa - Serving India with Pride
```

## Step 4: Get Your Keys

1. Go to **Integration** in your EmailJS dashboard
2. Note down these values:
   - **Service ID**: (from your service)
   - **Template ID**: `nagrik_sewa_verification`
   - **Public Key**: (from Integration page)
   - **Private Key**: (from Account > API Keys)

## Step 5: Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# EmailJS Configuration (Frontend)
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=nagrik_sewa_verification
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key

# EmailJS Configuration (Backend)
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=nagrik_sewa_verification
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key
```

## Step 6: Test the Setup

1. Restart your development server: `npm run dev`
2. Try registering a new user
3. Check your email for the verification code

## Troubleshooting

### Emails not received?
1. Check spam/junk folder
2. Verify EmailJS service is active
3. Check EmailJS dashboard for send logs
4. Ensure email template variables match: `{{to_name}}`, `{{verification_code}}`

### Still not working?
The system will fall back to console logging. Check your terminal for verification codes.

### Free Tier Limits
- EmailJS free tier: 200 emails/month
- For production, consider upgrading to a paid plan

## Template Variables

The system sends these variables to EmailJS:
- `to_email`: Recipient's email address
- `to_name`: User's first name
- `verification_code`: 6-digit verification code
- `from_name`: "Nagrik Sewa Team"
- `reply_to`: "noreply@nagriksewa.com"

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- EmailJS public key is safe to expose (it's meant to be public)
- Keep private key secret and server-side only

---

Once configured, users will receive beautiful verification emails directly in their inbox! 📧✨