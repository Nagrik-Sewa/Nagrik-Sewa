# PowerShell Production Deployment Script for Nagrik Sewa
# This script prepares and builds the application for production deployment

param(
    [switch]$SkipTests = $false,
    [switch]$SkipAudit = $false,
    [string]$BuildDir = "dist"
)

# Configuration
$AppName = "nagrik-sewa"
$BackupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# Colors for output
$Host.UI.RawUI.ForegroundColor = "White"

function Write-Step {
    param($Message)
    Write-Host "`n📋 Step: $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

Write-Host "🚀 Starting production deployment for $AppName..." -ForegroundColor Blue

# Check prerequisites
Write-Step "Checking prerequisites"

try {
    $NodeVersion = node --version
    $NpmVersion = npm --version
    Write-Success "Node.js version: $NodeVersion"
    Write-Success "npm version: $NpmVersion"
} catch {
    Write-Error "Node.js or npm is not installed. Please install Node.js first."
    exit 1
}

# Check if we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the project root directory."
    exit 1
}

# Backup existing build if it exists
if (Test-Path $BuildDir) {
    Write-Step "Backing up existing build"
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Copy-Item -Path $BuildDir -Destination $BackupDir -Recurse -Force
    Write-Success "Backup created: $BackupDir"
}

# Clean previous builds
Write-Step "Cleaning previous builds"
if (Test-Path $BuildDir) {
    Remove-Item -Path $BuildDir -Recurse -Force
}
if (Test-Path "node_modules\.cache") {
    Remove-Item -Path "node_modules\.cache" -Recurse -Force
}
Write-Success "Cleanup completed"

# Install dependencies
Write-Step "Installing dependencies"
npm ci --only=production
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install dependencies"
    exit 1
}
Write-Success "Dependencies installed"

# Run security audit
if (-not $SkipAudit) {
    Write-Step "Running security audit"
    npm audit --audit-level moderate
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Security audit passed"
    } else {
        Write-Warning "Security vulnerabilities detected. Consider running 'npm audit fix'"
    }
}

# Run tests (if available)
if (-not $SkipTests) {
    Write-Step "Running tests"
    npm run test 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Tests passed"
    } else {
        Write-Warning "Tests failed or not available"
    }
}

# Type checking
Write-Step "Running type check"
npm run typecheck 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Success "Type checking passed"
} else {
    Write-Warning "Type checking failed or not available"
}

# Build the application
Write-Step "Building application"
$env:NODE_ENV = "production"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Success "Build completed successfully"
} else {
    Write-Error "Build failed"
    exit 1
}

# Verify build output
Write-Step "Verifying build output"
if (Test-Path $BuildDir) {
    $BuildSize = (Get-ChildItem -Path $BuildDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    $BuildSizeFormatted = "{0:N2} MB" -f $BuildSize
    Write-Success "Build directory created: $BuildDir ($BuildSizeFormatted)"
    
    # Check for essential files
    if (Test-Path "$BuildDir\spa\index.html") {
        Write-Success "Client build found"
    } else {
        Write-Warning "Client build not found in $BuildDir\spa\"
    }
    
    if (Test-Path "$BuildDir\server\node-build.mjs") {
        Write-Success "Server build found"
    } else {
        Write-Warning "Server build not found in $BuildDir\server\"
    }
} else {
    Write-Error "Build directory not created"
    exit 1
}

# Generate deployment info
Write-Step "Generating deployment info"
$GitCommit = try { git rev-parse --short HEAD } catch { "unknown" }
$GitBranch = try { git rev-parse --abbrev-ref HEAD } catch { "unknown" }

$DeploymentInfo = @{
    appName = $AppName
    buildDate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    buildSize = $BuildSizeFormatted
    nodeVersion = $NodeVersion
    npmVersion = $NpmVersion
    environment = "production"
    gitCommit = $GitCommit
    gitBranch = $GitBranch
} | ConvertTo-Json -Depth 3

$DeploymentInfo | Out-File -FilePath "$BuildDir\deployment-info.json" -Encoding UTF8
Write-Success "Deployment info generated"

# Create deployment checklist
Write-Step "Creating deployment checklist"
$ChecklistContent = @"
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
"@

$ChecklistContent | Out-File -FilePath "$BuildDir\DEPLOYMENT_CHECKLIST.md" -Encoding UTF8
Write-Success "Deployment checklist created"

# Performance recommendations
Write-Step "Performance recommendations"
Write-Host "📊 Performance Optimization Tips:" -ForegroundColor Yellow
Write-Host "1. Use a CDN for static assets" -ForegroundColor Yellow
Write-Host "2. Enable gzip compression on your server" -ForegroundColor Yellow
Write-Host "3. Set up proper caching headers" -ForegroundColor Yellow
Write-Host "4. Monitor application performance with APM tools" -ForegroundColor Yellow
Write-Host "5. Use HTTP/2 for better performance" -ForegroundColor Yellow
Write-Host "6. Optimize images and use WebP format when possible" -ForegroundColor Yellow
Write-Host "7. Implement service worker for offline functionality" -ForegroundColor Yellow

# Final summary
Write-Step "Deployment Summary"
Write-Host "🎉 Production build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Build directory: $BuildDir" -ForegroundColor Green
Write-Host "📏 Build size: $BuildSizeFormatted" -ForegroundColor Green
Write-Host "⏰ Build time: $(Get-Date)" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Ready for deployment!" -ForegroundColor Green

# Instructions for deployment
Write-Host "📋 Next Steps:" -ForegroundColor Blue
Write-Host "1. Copy the '$BuildDir' directory to your production server" -ForegroundColor Blue
Write-Host "2. Set up environment variables on the server" -ForegroundColor Blue
Write-Host "3. Install production dependencies: npm ci --only=production" -ForegroundColor Blue
Write-Host "4. Start the application: npm start" -ForegroundColor Blue
Write-Host "5. Configure reverse proxy (nginx/apache) if needed" -ForegroundColor Blue
Write-Host "6. Set up SSL certificates" -ForegroundColor Blue
Write-Host "7. Configure monitoring and logging" -ForegroundColor Blue

Write-Success "Deployment script completed!"

exit 0