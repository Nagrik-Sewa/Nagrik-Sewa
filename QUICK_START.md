# 🚀 Quick Start Guide - Nagrik Sewa

## ⚡ Get Started in 5 Minutes

### 1. Prerequisites Check
- ✅ Node.js v18+ installed
- ✅ MongoDB running (local or Atlas)
- ✅ Git installed

### 2. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/nagrik-sewa.git
cd nagrik-sewa

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 3. Minimal Required Environment Variables

Edit `.env` file with these **MINIMUM** required values:

```env
# === ABSOLUTELY REQUIRED ===
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your-32-character-secure-random-string
MONGODB_URI=mongodb://localhost:27017/nagrik-sewa
NODE_ENV=development
PORT=8080
CLIENT_URL=http://localhost:8080
FRONTEND_URL=http://localhost:8080
```

### 4. Get Your API Keys

#### 🔑 Google Gemini AI (5 minutes)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into `VITE_GEMINI_API_KEY`

#### 🔑 Google OAuth (10 minutes)
1. Visit: https://console.developers.google.com/
2. Create new project
3. Enable "Google+ API"
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Application type: "Web application"
6. Add authorized origins: `http://localhost:8080`
7. Add redirect URIs: `http://localhost:8080/auth/google/callback`
8. Copy Client ID and Secret

#### 🔑 JWT Secret (30 seconds)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output to `JWT_SECRET`

### 5. Start the Server
```bash
npm run dev
```

### 6. Access the Application
Open your browser: **http://localhost:8080**

---

## ✅ Success Indicators

You should see:
```
✅ MongoDB connected successfully
➜  Local:   http://localhost:8080/
```

---

## 🔧 Troubleshooting

### MongoDB Connection Failed?
```bash
# Option 1: Use MongoDB Atlas (free cloud)
# Get URI from: https://www.mongodb.com/cloud/atlas

# Option 2: Start local MongoDB
# Windows: MongoDB runs as a service automatically
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Google OAuth Not Working?
- Check Client ID is in both `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID`
- Verify authorized origins in Google Console
- Make sure Client Secret is correct

### AI Chatbot Not Responding?
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Test your API key at: https://makersuite.google.com/

---

## 📚 Next Steps

1. **Read the full README**: See `README.md` for complete documentation
2. **Configure optional services**: Email, SMS, Payments (see README)
3. **Explore the code**: Check out the project structure
4. **Start building**: Make your first changes!

---

## 🆘 Need Help?

- **Detailed Setup**: See [README.md](./README.md)
- **Environment Variables**: All variables explained in [README.md](./README.md#-environment-variables-setup-detailed-guide)
- **Issues**: [GitHub Issues](https://github.com/your-username/nagrik-sewa/issues)

---

**💡 Tip**: The application will work with just the required variables. Optional services (Email, SMS, Payments) will be disabled but won't break the app!
