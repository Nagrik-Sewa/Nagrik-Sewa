# 🔧 Environment Variables Setup Guide

This guide provides detailed instructions on setting up all required environment variables for the **Nagrik Sewa** platform - a comprehensive civic services application with authentication, payments, communications, and AI integration.

## 📋 Quick Setup Checklist

- [ ] MongoDB Database
- [ ] Google OAuth & AI
- [ ] JWT Secrets
- [ ] Email Services (SMTP + EmailJS)
- [ ] SMS Services (Twilio)
- [ ] Payment Gateway (Razorpay)
- [ ] DigiLocker Integration
- [ ] File Upload Configuration
- [ ] Frontend URLs

## 🏗️ Project Architecture

This is a full-stack application with:
- **Frontend**: React/TypeScript with Vite
- **Backend**: Node.js/Express with TypeScript
- **Database**: MongoDB
- **Deployment**: Netlify (frontend) + Node.js server

## 📁 Environment Files Structure

Create these files in your project root:

```
.env                    # Main environment file (never commit)
.env.example           # Template file (already exists)
.env.local             # Local development overrides
.env.production        # Production-specific variables
```

---

## 🔐 Required Environment Variables

### 1. **Database Configuration**

#### MongoDB Database
```bash
MONGODB_URI=mongodb://localhost:27017/nagrik-sewa
# or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nagrik-sewa?retryWrites=true&w=majority
```

**How to get MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

---

### 2. **Authentication & Security**

#### JWT Secrets (Required)
```bash
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-different-from-jwt-secret
REFRESH_TOKEN_EXPIRES_IN=30d
```

**How to generate secure secrets:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64

# Option 3: Online generator (use with caution)
# https://passwordsgenerator.net/ (select 64 characters, include symbols)
```

---

### 3. **Google Services**

#### Google OAuth (Required for login)
```bash
VITE_GOOGLE_CLIENT_ID=123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Google+ API" and "OAuth 2.0"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type: "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:8080/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)
7. Copy Client ID and Client Secret

#### Google AI Gemini (Required for AI features)
```bash
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get Gemini API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the generated key

---

### 4. **Email Services**

#### SMTP Configuration (for backend emails)
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-app-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM="Nagrik Sewa" <noreply@nagriksewa.com>
```

**How to set up Gmail SMTP:**
1. Enable 2-Factor Authentication on your Gmail
2. Go to Google Account Settings → Security
3. Generate "App Password" for "Mail"
4. Use this 16-character password (not your regular password)

#### EmailJS Configuration (for frontend emails)
```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

**How to set up EmailJS:**
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create free account
3. Add email service (Gmail recommended)
4. Create email template with these variables:
   - `{{to_email}}` - recipient email
   - `{{to_name}}` - recipient name
   - `{{verification_code}}` - OTP code
   - `{{from_name}}` - sender name
5. Copy Service ID, Template ID, and Public Key

---

### 5. **SMS Services**

#### Twilio SMS (for OTP)
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

**How to set up Twilio:**
1. Go to [Twilio Console](https://console.twilio.com/)
2. Create free account (includes trial credit)
3. Go to "Phone Numbers" → "Manage" → "Active numbers"
4. Purchase a phone number or use trial number
5. Copy Account SID, Auth Token, and Phone Number

---

### 6. **Payment Gateway**

#### Razorpay (for payments)
```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to set up Razorpay:**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Create account and complete verification
3. Go to "Settings" → "API Keys"
4. Generate Test/Live keys
5. Set up webhook URL: `https://yourdomain.com/api/payment/webhook`
6. Copy the webhook secret

---

### 7. **DigiLocker Integration**

#### DigiLocker API (for document verification)
```bash
DIGILOCKER_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DIGILOCKER_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DIGILOCKER_REDIRECT_URI=https://yourdomain.com/auth/digilocker/callback
```

**How to get DigiLocker API:**
1. Go to [DigiLocker Developer Portal](https://api.digitallocker.gov.in/)
2. Register as developer
3. Create new application
4. Submit for approval (may take few days)
5. Once approved, get Client ID and Secret

---

### 8. **Application Configuration**

#### Server Configuration
```bash
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8080
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### File Upload Configuration
```bash
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### Security Configuration
```bash
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

---

## 🚀 Production Environment Setup

### For Production Deployment:

1. **Update URLs:**
```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://nagrik-sewa.netlify.app
VITE_API_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com
```

2. **Use Production Keys:**
   - Switch all test keys to live/production keys
   - Update OAuth redirect URLs
   - Use production MongoDB cluster

3. **Netlify Environment Variables:**
   Add all `VITE_*` variables in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add each `VITE_` prefixed variable

---

## 📝 Environment File Example

Create `.env` file in project root:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/nagrik-sewa

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-different-from-jwt-secret
REFRESH_TOKEN_EXPIRES_IN=30d

# Google Services
VITE_GOOGLE_CLIENT_ID=123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Services
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-app-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM="Nagrik Sewa" <noreply@nagriksewa.com>
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx

# SMS Service
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# DigiLocker
DIGILOCKER_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DIGILOCKER_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DIGILOCKER_REDIRECT_URI=http://localhost:8080/auth/digilocker/callback

# App Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8080
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

---

## 🧪 Testing Environment Setup

For testing, you can use these free tier options:

1. **MongoDB Atlas** - Free 512MB cluster
2. **Google Cloud** - Free AI API quota
3. **Twilio** - Trial credit for SMS
4. **Razorpay** - Test mode (no real transactions)
5. **EmailJS** - Free tier (200 emails/month)
6. **Netlify** - Free hosting and environment variables

---

## 🔍 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed:**
   - Check if MongoDB is running locally
   - Verify connection string format
   - Check network access for Atlas

2. **Google OAuth Error:**
   - Verify redirect URIs match exactly
   - Check if APIs are enabled in Google Cloud Console
   - Ensure client ID starts with correct format

3. **Email Sending Failed:**
   - For Gmail: Use app-specific password
   - Check SMTP settings
   - Verify firewall isn't blocking port 587

4. **SMS Not Sending:**
   - Verify Twilio account is active
   - Check if phone number is verified
   - Ensure account has sufficient balance

5. **Payment Integration Error:**
   - Check if webhook URL is reachable
   - Verify Razorpay keys are correct
   - Test in sandbox mode first

---

## 🛡️ Security Best Practices

1. **Never commit `.env` files to Git**
2. **Use different secrets for production**
3. **Rotate secrets regularly**
4. **Use strong, random passwords**
5. **Enable 2FA on all service accounts**
6. **Use environment-specific configurations**
7. **Monitor API usage and quotas**

---

## 📞 Support

If you encounter issues:

1. Check the console for specific error messages
2. Verify all environment variables are set correctly
3. Test with minimal configuration first
4. Check service-specific documentation
5. Ensure all external services are properly configured

---

**🎉 Once all environment variables are set up correctly, your Nagrik Sewa platform will have full functionality including authentication, payments, communications, and AI-powered features!**