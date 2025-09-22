# API Setup Guide for Nagrik Sewa

This guide will help you set up all the required API keys and environment variables for the Nagrik Sewa platform.

## Quick Start

1. Copy the `.env.example` file to `.env`
2. Fill in all the required API keys and configuration values
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server

## Required Environment Variables

### Database Configuration
```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
DATABASE_NAME=nagrik-sewa
```

**How to get MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get the connection string from "Connect" → "Connect your application"

### AI & Chatbot Services
```bash
# Google Gemini AI API
VITE_GEMINI_API_KEY=AIzaSyBi1i45z8iTsRn3PKHW0_yCt2dQ2ULgmpg
GEMINI_API_KEY=AIzaSyBi1i45z8iTsRn3PKHW0_yCt2dQ2ULgmpg
```

**How to get Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### Google Services
```bash
# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:8080/auth/google/callback

# Google Maps API (for location services)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**How to get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" and "OAuth2 API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs: `http://localhost:8080/auth/google/callback`

**How to get Google Maps API:**
1. In Google Cloud Console, enable "Maps JavaScript API"
2. Go to "Credentials" → "Create Credentials" → "API Key"
3. Restrict the key to "Maps JavaScript API"

### DigiLocker Integration
```bash
# DigiLocker API for document verification
DIGILOCKER_CLIENT_ID=your_digilocker_client_id
DIGILOCKER_CLIENT_SECRET=your_digilocker_client_secret
DIGILOCKER_REDIRECT_URI=http://localhost:8080/auth/digilocker/callback
DIGILOCKER_BASE_URL=https://api.digitallocker.gov.in
```

**How to get DigiLocker API:**
1. Go to [DigiLocker Developer Portal](https://partners.digitallocker.gov.in/)
2. Register as a developer
3. Create a new application
4. Get client ID and secret from the application dashboard

### Communication Services
```bash
# EmailJS for email notifications
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# SMS Service (Twilio or similar)
SMS_SERVICE_SID=your_sms_service_sid
SMS_AUTH_TOKEN=your_sms_auth_token
SMS_PHONE_NUMBER=your_twilio_phone_number
```

**How to get EmailJS:**
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create account and service
3. Create email template
4. Get service ID, template ID, and public key

**How to get Twilio SMS:**
1. Go to [Twilio](https://www.twilio.com/)
2. Create account and get phone number
3. Get Account SID, Auth Token from dashboard

### Payment Integration
```bash
# Razorpay for payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**How to get Razorpay:**
1. Go to [Razorpay](https://razorpay.com/)
2. Create merchant account
3. Get API keys from Settings → API Keys

### Security & Authentication
```bash
# JWT Secret for authentication
JWT_SECRET=your_super_secure_jwt_secret_key_at_least_32_characters_long

# Session Secret
SESSION_SECRET=your_session_secret_key

# Encryption keys
ENCRYPTION_KEY=your_32_character_encryption_key
```

**How to generate secure keys:**
```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### File Storage
```bash
# AWS S3 for file uploads (optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=nagrik-sewa-uploads

# OR use local file storage
UPLOAD_PATH=./uploads
```

**How to get AWS S3:**
1. Go to [AWS Console](https://aws.amazon.com/)
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Get access key and secret

### Application Configuration
```bash
# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# API Configuration
API_BASE_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:8080

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Complete .env File Template

```bash
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nagrik-sewa
DATABASE_NAME=nagrik-sewa

# AI Services
VITE_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key

# Google Services
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:8080/auth/google/callback
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# DigiLocker
DIGILOCKER_CLIENT_ID=your_digilocker_client_id
DIGILOCKER_CLIENT_SECRET=your_digilocker_client_secret
DIGILOCKER_REDIRECT_URI=http://localhost:8080/auth/digilocker/callback
DIGILOCKER_BASE_URL=https://api.digitallocker.gov.in

# Communication
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
SMS_SERVICE_SID=your_sms_service_sid
SMS_AUTH_TOKEN=your_sms_auth_token
SMS_PHONE_NUMBER=your_twilio_phone_number

# Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Security
JWT_SECRET=your_super_secure_jwt_secret_key_at_least_32_characters_long
SESSION_SECRET=your_session_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=nagrik-sewa-uploads
UPLOAD_PATH=./uploads

# Application
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
API_BASE_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:8080
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91987654321",
  "password": "securePassword123",
  "location": "Mumbai, Maharashtra"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isVerified": false
  },
  "token": "jwt_token"
}
```

#### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### POST /api/auth/google
Google OAuth authentication.

#### POST /api/auth/verify-otp
Verify OTP for phone/email verification.

**Request:**
```json
{
  "otp": "123456",
  "type": "phone" // or "email"
}
```

### Resume Management Endpoints

#### GET /api/resume/get
Get user's resume data.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "resume": {
    "personal": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+91987654321",
      "profileSummary": "..."
    },
    "experience": [...],
    "education": [...],
    "skills": [...],
    "certificates": [...]
  }
}
```

#### POST /api/resume/save
Save or update user's resume.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request:**
```json
{
  "personal": { ... },
  "experience": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "certificates": [ ... ]
}
```

#### POST /api/resume/generate-pdf
Generate PDF from resume data.

### Services & Bookings

#### GET /api/services
Get list of available services.

#### POST /api/bookings
Create a new service booking.

#### GET /api/bookings
Get user's bookings.

### Chatbot & AI

#### POST /api/chatbot/message
Send message to AI chatbot.

**Request:**
```json
{
  "message": "How can I apply for PMKVY scheme?",
  "context": "government_schemes"
}
```

#### POST /api/chatbot/enhance-resume
Enhance resume content using AI.

**Request:**
```json
{
  "resumeData": { ... },
  "section": "experience" // optional
}
```

### File Upload

#### POST /api/upload
Upload files (documents, images).

**Form Data:**
- file: File to upload
- type: document/image
- category: resume/verification/other

## Testing the APIs

### Using curl:
```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"test123","phone":"+919876543210"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test protected route
curl -X GET http://localhost:3000/api/resume/get \
  -H "Authorization: Bearer your_jwt_token"
```

### Using Postman:
1. Import the API collection (if available)
2. Set up environment variables for base URL and tokens
3. Test each endpoint with sample data

## Deployment Configuration

### Production Environment Variables
```bash
# Use production URLs and secure secrets
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
API_BASE_URL=https://api.your-domain.com

# Use strong secrets in production
JWT_SECRET=very_strong_production_secret_64_characters_minimum
```

### Security Considerations
1. Never commit `.env` files to version control
2. Use different API keys for development and production
3. Enable CORS only for your domain in production
4. Use HTTPS in production
5. Set secure session configurations
6. Enable rate limiting
7. Use strong, unique secrets for each environment

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check if MongoDB URI is correct
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify username and password

2. **Google OAuth Not Working**
   - Check redirect URI matches exactly
   - Ensure Google APIs are enabled
   - Verify client ID and secret

3. **AI Chatbot Not Responding**
   - Check Gemini API key is valid
   - Ensure API quotas are not exceeded
   - Verify internet connectivity

4. **File Uploads Failing**
   - Check upload directory permissions
   - Verify file size limits
   - Ensure AWS S3 credentials (if using S3)

5. **Email/SMS Not Sending**
   - Verify EmailJS configuration
   - Check Twilio credentials and phone number
   - Ensure templates are set up correctly

### Getting Help:
1. Check the console for detailed error messages
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check network connectivity
5. Review API documentation for each service

## Development Tips

1. **Start with free tiers** of all services
2. **Test thoroughly** in development before production
3. **Monitor API usage** to avoid quota limits
4. **Keep backups** of important configurations
5. **Use version control** for environment templates
6. **Document any custom configurations**

## License
This project is licensed under the MIT License - see the LICENSE file for details.