#!/bin/bash

# Production Deployment Script for Nagrik Sewa
# This script prepares and builds the application for production deployment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="nagrik-sewa"
BUILD_DIR="dist"
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}🚀 Starting production deployment for ${APP_NAME}...${NC}"

# Function to print step headers
print_step() {
    echo -e "\n${BLUE}📋 Step: $1${NC}"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print errors
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js and npm are installed
print_step "Checking prerequisites"
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_success "Node.js version: $NODE_VERSION"
print_success "npm version: $NPM_VERSION"

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Backup existing build if it exists
if [ -d "$BUILD_DIR" ]; then
    print_step "Backing up existing build"
    mkdir -p "$BACKUP_DIR"
    cp -r "$BUILD_DIR" "$BACKUP_DIR/"
    print_success "Backup created: $BACKUP_DIR"
fi

# Clean previous builds
print_step "Cleaning previous builds"
rm -rf "$BUILD_DIR"
rm -rf "node_modules/.cache"
print_success "Cleanup completed"

# Install dependencies
print_step "Installing dependencies"
npm ci --only=production
print_success "Dependencies installed"

# Run security audit
print_step "Running security audit"
if npm audit --audit-level moderate; then
    print_success "Security audit passed"
else
    print_warning "Security vulnerabilities detected. Consider running 'npm audit fix'"
fi

# Run tests (if available)
print_step "Running tests"
if npm run test --if-present; then
    print_success "Tests passed"
else
    print_warning "Tests failed or not available"
fi

# Type checking
print_step "Running type check"
if npm run typecheck --if-present; then
    print_success "Type checking passed"
else
    print_warning "Type checking failed or not available"
fi

# Build the application
print_step "Building application"
export NODE_ENV=production
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Verify build output
print_step "Verifying build output"
if [ -d "$BUILD_DIR" ]; then
    BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
    print_success "Build directory created: $BUILD_DIR ($BUILD_SIZE)"
    
    # Check for essential files
    if [ -f "$BUILD_DIR/spa/index.html" ]; then
        print_success "Client build found"
    else
        print_warning "Client build not found in $BUILD_DIR/spa/"
    fi
    
    if [ -f "$BUILD_DIR/server/node-build.mjs" ]; then
        print_success "Server build found"
    else
        print_warning "Server build not found in $BUILD_DIR/server/"
    fi
else
    print_error "Build directory not created"
    exit 1
fi

# Generate deployment info
print_step "Generating deployment info"
cat > "$BUILD_DIR/deployment-info.json" << EOF
{
  "appName": "$APP_NAME",
  "buildDate": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "buildSize": "$BUILD_SIZE",
  "nodeVersion": "$NODE_VERSION",
  "npmVersion": "$NPM_VERSION",
  "environment": "production",
  "gitCommit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
}
EOF
print_success "Deployment info generated"

# Create deployment checklist
print_step "Creating deployment checklist"
cat > "$BUILD_DIR/DEPLOYMENT_CHECKLIST.md" << 'EOF'
# Deployment Checklist

## Pre-deployment
- [ ] Environment variables are set correctly
- [ ] Database connection string is configured
- [ ] SSL certificates are in place
- [ ] Domain/subdomain is configured
- [ ] CDN is configured (if applicable)

## Database
- [ ] Database migrations are run
- [ ] Database backup is created
- [ ] Database connection is tested

## Security
- [ ] All secrets are properly configured
- [ ] CORS settings are correct for production
- [ ] Rate limiting is configured
- [ ] Security headers are enabled

## Monitoring
- [ ] Application monitoring is set up
- [ ] Error tracking is configured
- [ ] Performance monitoring is enabled
- [ ] Health check endpoints are working

## Performance
- [ ] Static assets are optimized
- [ ] Caching is configured
- [ ] CDN is working
- [ ] Compression is enabled

## Post-deployment
- [ ] Application is accessible
- [ ] All features are working
- [ ] Performance is acceptable
- [ ] Monitoring alerts are working
- [ ] Database is responding
- [ ] External integrations are working
EOF

print_success "Deployment checklist created"

# Performance recommendations
print_step "Performance recommendations"
echo -e "${YELLOW}"
echo "📊 Performance Optimization Tips:"
echo "1. Use a CDN for static assets"
echo "2. Enable gzip compression on your server"
echo "3. Set up proper caching headers"
echo "4. Monitor application performance with APM tools"
echo "5. Use HTTP/2 for better performance"
echo "6. Optimize images and use WebP format when possible"
echo "7. Implement service worker for offline functionality"
echo -e "${NC}"

# Final summary
print_step "Deployment Summary"
echo -e "${GREEN}"
echo "🎉 Production build completed successfully!"
echo ""
echo "📁 Build directory: $BUILD_DIR"
echo "📏 Build size: $BUILD_SIZE"
echo "⏰ Build time: $(date)"
echo ""
echo "🚀 Ready for deployment!"
echo -e "${NC}"

# Instructions for deployment
echo -e "${BLUE}"
echo "📋 Next Steps:"
echo "1. Copy the '$BUILD_DIR' directory to your production server"
echo "2. Set up environment variables on the server"
echo "3. Install production dependencies: npm ci --only=production"
echo "4. Start the application: npm start"
echo "5. Configure reverse proxy (nginx/apache) if needed"
echo "6. Set up SSL certificates"
echo "7. Configure monitoring and logging"
echo -e "${NC}"

print_success "Deployment script completed!"

exit 0