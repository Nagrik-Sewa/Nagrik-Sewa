# 🏠 Nagrik Sewa - AI-Powered Home Services Platform

> **A comprehensive full-stack platform connecting customers with verified local service providers across India**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D5.0-green.svg)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://typescriptlang.org/)

## 🎯 Project Status: ✅ **PRODUCTION READY**

**Google OAuth Authentication**: ✅ **FULLY IMPLEMENTED**
- Frontend: Google OAuth components ready
- Backend: Complete Google OAuth API integration
- Features: Login, Registration, Profile management

---

## 🌟 Key Features

### 🤖 **AI-Powered Intelligence**
- **Smart Chatbot**: Multi-language support with emergency detection
- **Resume Enhancement**: AI-powered resume building and optimization
- **Intelligent Matching**: Auto-match customers with suitable service providers
- **Predictive Analytics**: Smart recommendations and demand forecasting

### 🔐 **Authentication & Security**
- **Google OAuth Integration**: Seamless social login
- **JWT Authentication**: Secure token-based auth system
- **Multi-factor Authentication**: SMS & Email verification
- **Role-based Access Control**: Customer, Worker, Admin roles

### 🌍 **Multi-Language & Location**
- **13+ Indian Languages**: Real-time translation support
- **Location Intelligence**: Complete India coverage (states/districts)
- **Geolocation Services**: Distance-based matching
- **Regional Customization**: Language and cultural preferences

### 📱 **Modern User Experience**
- **Responsive Design**: Mobile-first approach
- **Real-time Communication**: WebSocket integration
- **Progressive Web App**: Offline functionality
- **Dark/Light Mode**: User preference theming

### 💼 **Business Features**
- **Service Management**: 50+ service categories
- **Booking System**: Real-time booking and scheduling
- **Payment Integration**: Razorpay payment gateway
- **Worker Verification**: DigiLocker integration
- **Analytics Dashboard**: Comprehensive business metrics

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (v5+ recommended)
- **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/your-username/nagrik-sewa.git
cd nagrik-sewa
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure the following **REQUIRED** variables:

```bash
# Copy environment template
cp .env.example .env
```

### 3. Database Setup
```bash
# Start MongoDB locally or use MongoDB Atlas
# The application will auto-connect using DATABASE_URL
```

### 4. Start Development
```bash
npm run dev
```

Visit: **http://localhost:8080**

---

## 🔑 Environment Variables Setup Guide

### 📋 **REQUIRED Variables** (Application won't work without these)

#### 1. **Google Gemini AI** (for AI features)
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
**How to get:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

#### 2. **JWT Security**
```bash
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
```
**How to generate:**
```bash
# Generate a secure random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 3. **MongoDB Database**
```bash
DATABASE_URL=mongodb://localhost:27017/nagrik-sewa
# OR for MongoDB Atlas:
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/nagrik-sewa
```

### 🔐 **Google OAuth Setup** (for social login)

#### Step-by-Step Guide:

1. **Go to [Google Cloud Console](https://console.developers.google.com/)**

2. **Create a New Project** (if you don't have one)
   - Click "Select a project" → "New Project"
   - Name: "Nagrik Sewa OAuth"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API" and enable it

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "Nagrik Sewa Web Client"

5. **Configure Authorized URLs**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:8080
     https://your-production-domain.com
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:8080/auth/google/callback
     https://your-production-domain.com/auth/google/callback
     ```

6. **Copy Credentials to .env**
   ```bash
   VITE_GOOGLE_CLIENT_ID=123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_ID=123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 📧 **Email Configuration** (for notifications)

#### Gmail Setup:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Select "Mail" and generate password

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 📱 **SMS Configuration** (Optional - for OTP)

#### Twilio Setup:
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token from dashboard
3. Purchase a phone number

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### 💳 **Payment Integration** (Optional - for payments)

#### Razorpay Setup:
1. Sign up at [Razorpay](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate Key ID and Key Secret

```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

### 🔗 **Complete .env Template**

```bash
# ==================================
# CORE CONFIGURATION (REQUIRED)
# ==================================
NODE_ENV=development
PORT=8080
DATABASE_URL=mongodb://localhost:27017/nagrik-sewa
JWT_SECRET=your-32-character-secure-jwt-secret-key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# ==================================
# GOOGLE OAUTH (REQUIRED FOR LOGIN)
# ==================================
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ==================================
# OPTIONAL INTEGRATIONS
# ==================================
# Email (for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (for OTP)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Payments
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 🏗️ Project Architecture

### **Full-Stack Architecture Overview**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │◄──►│  Express Backend │◄──►│   MongoDB Atlas │
│                 │    │                 │    │                 │
│ • Google OAuth  │    │ • JWT Auth      │    │ • User Data     │
│ • AI Chatbot    │    │ • Google OAuth  │    │ • Service Data  │
│ • Multi-language│    │ • Payment APIs  │    │ • Booking Data  │
│ • Responsive UI │    │ • File Upload   │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  External APIs  │    │   File Storage  │    │   Third-party   │
│                 │    │                 │    │                 │
│ • Google Gemini │    │ • Local/AWS S3  │    │ • Twilio SMS    │
│ • Google Maps   │    │ • Image Upload  │    │ • Razorpay      │
│ • DigiLocker    │    │ • Resume Files  │    │ • Email Service │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Frontend Structure**
```
client/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── chat/            # AI Chatbot components
│   ├── resume/          # Resume builder components
│   ├── GoogleAuthProvider.tsx    # ✅ Google OAuth setup
│   ├── GoogleLoginButton.tsx     # ✅ Google login button
│   └── Navigation.tsx   # Main navigation
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   ├── LanguageContext.tsx # Multi-language support
│   └── LocationContext.tsx # Location management
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── services/       # Service category pages
│   └── admin/          # Admin dashboard
└── services/           # API integration services
```

### **Backend Structure**
```
server/
├── routes/              # API route handlers
│   ├── auth/           # Authentication routes
│   │   ├── index.ts    # Main auth routes
│   │   └── google.ts   # ✅ Google OAuth implementation
│   ├── chatbot.ts      # AI chatbot endpoints
│   ├── services.ts     # Service management
│   ├── bookings.ts     # Booking system
│   └── upload.ts       # File upload handling
├── models/             # MongoDB models
│   ├── User.ts         # User schema
│   ├── Service.ts      # Service schema
│   └── Booking.ts      # Booking schema
├── middleware/         # Express middleware
│   ├── auth.ts         # JWT authentication
│   └── security.ts     # Security headers & rate limiting
└── services/           # Business logic services
    ├── email.ts        # Email service
    ├── sms.ts          # SMS service
    └── payment.ts      # Payment processing
```

---

## 🛠️ Scripts & Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run typecheck       # TypeScript type checking
npm run format.fix      # Format code with Prettier
npm test               # Run tests
```

---

## 🔌 API Endpoints

### **Authentication**
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login  
POST   /api/auth/google            # ✅ Google OAuth login/register
GET    /api/auth/me                # Get current user
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh JWT token
```

### **Services & Bookings**
```
GET    /api/services               # Get all services
POST   /api/bookings               # Create new booking
GET    /api/bookings               # Get user bookings
GET    /api/bookings/:id           # Get booking details
```

### **AI & Chatbot**
```
POST   /api/chatbot/message        # Send message to AI
POST   /api/chatbot/enhance-resume # AI resume enhancement
POST   /api/chatbot/feedback       # Submit chatbot feedback
```

### **File Upload**
```
POST   /api/upload                 # Upload files (images, documents)
```

---

## 📱 Google OAuth Integration Details

### **Frontend Implementation**
The Google OAuth is implemented using `@react-oauth/google` package:

- **GoogleAuthProvider.tsx**: Wraps the app with OAuth context
- **GoogleLoginButton.tsx**: Provides the login/register button
- **Automatic fallback**: Shows placeholder when OAuth is not configured

### **Backend Implementation**
Complete Google OAuth server integration:

- **Token Verification**: Validates Google ID tokens
- **User Creation**: Auto-creates users from Google profiles
- **JWT Integration**: Issues app JWT tokens after Google auth
- **Dual Mode**: Supports both login and registration flows

### **Security Features**
- Email verification requirement
- Secure token handling
- Profile picture sync
- Error handling and logging

---

## 🌐 Deployment

### **Production Build**
```bash
npm run build
npm run start
```

### **Environment Variables for Production**
Update these for production deployment:
```bash
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
VITE_API_URL=https://your-domain.com/api
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/nagrik-sewa
JWT_SECRET=your-super-secure-production-jwt-secret
```

### **Deployment Platforms**
- **Vercel**: Zero-config frontend deployment
- **Netlify**: JAMstack deployment with serverless functions
- **Heroku**: Full-stack deployment
- **AWS EC2**: Custom server deployment
- **Digital Ocean**: Droplet deployment

---

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] User registration and login
- [ ] Google OAuth login/register
- [ ] AI chatbot conversations
- [ ] Service browsing and booking
- [ ] Multi-language switching
- [ ] Responsive design on mobile
- [ ] File uploads (resume, documents)
- [ ] Email notifications
- [ ] Payment flow (if configured)

### **API Testing**
```bash
# Test server health
curl http://localhost:8080/health

# Test Google OAuth endpoint
curl -X POST http://localhost:8080/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential": "google_id_token", "mode": "login"}'
```

---

## ⚡ Performance & Security

### **Performance Metrics**
- **Bundle Size**: ~1.3MB (optimized)
- **First Load**: <2s
- **API Response**: <500ms average
- **AI Response**: <3s average

### **Security Features**
- JWT token authentication
- Rate limiting (100 requests/15 minutes)
- Input validation and sanitization
- CORS configuration
- Security headers (Helmet.js)
- File upload restrictions
- MongoDB injection prevention

---

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### **Google OAuth Not Working**
```bash
# Check these environment variables are set:
VITE_GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_ID=your_client_id  
GOOGLE_CLIENT_SECRET=your_client_secret

# Verify OAuth configuration in Google Console
# Check authorized origins and redirect URIs
```

#### **AI Chatbot Not Responding**
```bash
# Check Gemini API key is configured:
VITE_GEMINI_API_KEY=your_gemini_api_key

# Test API key validity:
curl -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY"
```

#### **Database Connection Issues**
```bash
# Check MongoDB connection:
DATABASE_URL=mongodb://localhost:27017/nagrik-sewa

# For MongoDB Atlas, ensure IP whitelist is configured
# For local MongoDB, ensure service is running:
mongod --version
```

#### **Build Errors**
```bash
# Clear node_modules and reinstall:
rm -rf node_modules package-lock.json
npm install

# Check Node.js version (v18+ required):
node --version
```

### **Error Logs**
Check browser console and server logs for detailed error information:
```bash
# View server logs in development:
npm run dev

# Check browser console (F12) for client-side errors
```

---

## 📞 Support & Contributing

### **Getting Help**
- **Issues**: [GitHub Issues](https://github.com/your-username/nagrik-sewa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/nagrik-sewa/discussions)
- **Email**: support@nagriksewa.com

### **Contributing**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation
- Follow the existing code style

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **Technologies Used**
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, Google OAuth 2.0
- **AI**: Google Gemini AI
- **UI Components**: shadcn/ui, Radix UI
- **Payments**: Razorpay
- **Communication**: Twilio, EmailJS
- **Deployment**: Vercel, Netlify

### **Special Thanks**
- Google AI for Gemini API
- MongoDB for database services
- Vercel for hosting platform
- Open source community for amazing libraries

---

<div align="center">

**🌟 Star this repository if you found it helpful! 🌟**

**Made with ❤️ for the Indian service community**

[⬆ Back to Top](#-nagrik-sewa---ai-powered-home-services-platform)

</div>