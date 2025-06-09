# 🚀 Yetichat Deployment Guide

This guide covers various deployment options for Yetichat, from simple static hosting to full-featured cloud deployments.

## Table of Contents

- [Live Demo](#live-demo)
- [Quick Deployment Options](#quick-deployment-options)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Docker Deployment](#docker-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Variables](#environment-variables)
- [Deployment Checklist](#deployment-checklist)

## Live Demo

🌟 **Current Live Demo**: [https://msu7m21i7f.space.minimax.io](https://msu7m21i7f.space.minimax.io)

This demo showcases the full functionality of Yetichat with real-time messaging capabilities.

## Quick Deployment Options

### Option 1: One-Click Deployments

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/yetichat)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/username/yetichat)

### Option 2: Manual Deployment

Choose your preferred platform from the detailed guides below.

## Vercel Deployment

### Prerequisites

- Vercel account ([signup here](https://vercel.com/signup))
- GitHub repository with your code

### Step-by-Step Deployment

1. **Import Project**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

3. **Environment Variables**
   Add the following environment variables in Vercel:
   ```
   VITE_COMETCHAT_APP_ID=your_app_id
   VITE_COMETCHAT_REGION=your_region
   VITE_COMETCHAT_AUTH_KEY=your_auth_key
   VITE_COMETCHAT_REST_API_KEY=your_rest_api_key
   VITE_APP_NAME=Yetichat
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at a Vercel URL

### Vercel Configuration File

Create `vercel.json` in your root directory for advanced configuration:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Netlify Deployment

### Prerequisites

- Netlify account ([signup here](https://app.netlify.com/signup))
- GitHub repository with your code

### Step-by-Step Deployment

1. **Connect Repository**
   - Visit [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Build Settings**
   - **Base directory**: (leave empty)
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`

3. **Environment Variables**
   Go to Site Settings > Environment Variables and add:
   ```
   VITE_COMETCHAT_APP_ID=your_app_id
   VITE_COMETCHAT_REGION=your_region
   VITE_COMETCHAT_AUTH_KEY=your_auth_key
   VITE_COMETCHAT_REST_API_KEY=your_rest_api_key
   VITE_APP_NAME=Yetichat
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Netlify Configuration File

Create `netlify.toml` in your root directory:

```toml
[build]
  command = "pnpm run build" # or "pnpm build"
  publish = "dist"

[build.environment]
  # Ensure pnpm is used by Netlify's build image
  PNPM_VERSION = "8" # Specify your pnpm version or let Netlify use its default

# Redirects rule for Single Page Applications (SPA)
# This ensures that all paths are served by index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Optional: Settings for `netlify dev` local development server
[dev]
  command = "pnpm run dev" # Command to run the dev server
  port = 5173              # Port for the local dev server
  publish = "dist"         # Directory to serve locally (same as build.publish)
  # targetPort = 3000      # If your app runs on a different port during dev
```

## Docker Deployment

### Dockerfile

Create a `Dockerfile` in your root directory:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf` for serving the SPA:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

### Docker Commands

```bash
# Build the image
docker build -t yetichat .

# Run the container
docker run -p 8080:80 yetichat

# Or with environment variables
docker run -p 8080:80 \
  -e VITE_COMETCHAT_APP_ID=your_app_id \
  -e VITE_COMETCHAT_REGION=your_region \
  -e VITE_COMETCHAT_AUTH_KEY=your_auth_key \
  -e VITE_COMETCHAT_REST_API_KEY=your_rest_api_key \
  yetichat
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  yetichat:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_COMETCHAT_APP_ID=${VITE_COMETCHAT_APP_ID}
      - VITE_COMETCHAT_REGION=${VITE_COMETCHAT_REGION}
      - VITE_COMETCHAT_AUTH_KEY=${VITE_COMETCHAT_AUTH_KEY}
      - VITE_COMETCHAT_REST_API_KEY=${VITE_COMETCHAT_REST_API_KEY}
      - VITE_APP_NAME=Yetichat
      - VITE_APP_VERSION=1.0.0
    restart: unless-stopped
```

## Custom Server Deployment

### Prerequisites

- VPS or dedicated server
- Node.js 18+ installed
- nginx or Apache web server
- SSL certificate (recommended)

### Step-by-Step Process

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js and pnpm
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pnpm

   # Install nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/username/yetichat.git
   cd yetichat

   # Install dependencies
   pnpm install

   # Build for production
   pnpm build
   ```

3. **nginx Configuration**
   Create `/etc/nginx/sites-available/yetichat`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/yetichat/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Optional: SSL configuration
       # listen 443 ssl;
       # ssl_certificate /path/to/certificate.crt;
       # ssl_certificate_key /path/to/private.key;
   }
   ```

4. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/yetichat /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Environment Variables

### Required Variables

All deployment platforms need these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_COMETCHAT_APP_ID` | Your CometChat App ID | `26e10d1e21615f14` |
| `VITE_COMETCHAT_REGION` | CometChat region | `us` |
| `VITE_COMETCHAT_AUTH_KEY` | CometChat Auth Key | `6191dc2b6c28...` |
| `VITE_COMETCHAT_REST_API_KEY` | CometChat REST API Key | `679d760de8ff...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | `Yetichat` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

### Security Notes

- **Never commit** actual API keys to version control
- Use platform-specific environment variable systems
- Rotate keys regularly
- Use different keys for development and production

## Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] CometChat app configured and active
- [ ] Build process tested locally (`pnpm build`)
- [ ] All dependencies up to date
- [ ] Code linted and tested

### Post-Deployment

- [ ] Application loads correctly
- [ ] User registration/login works
- [ ] Real-time messaging functional
- [ ] All tabs/features working
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Error tracking configured (optional)

### Production Optimization

- [ ] Enable gzip compression
- [ ] Configure CDN (optional)
- [ ] Set up SSL certificate
- [ ] Configure caching headers
- [ ] Monitor application performance
- [ ] Set up backup strategy

## Monitoring and Maintenance

### Performance Monitoring

- Use tools like Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up application performance monitoring (APM)

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage analytics

### Updates and Maintenance

```bash
# Update dependencies
pnpm update

# Rebuild and redeploy
pnpm build

# Deploy new version
# (platform-specific commands)
```

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all environment variables are set
   - Clear cache: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

2. **Runtime Errors**
   - Check browser console for errors
   - Verify CometChat configuration
   - Test with different browsers/devices

3. **Performance Issues**
   - Enable compression
   - Optimize images
   - Use production build
   - Configure CDN

### Getting Help

- Check deployment platform documentation
- Review application logs
- Test locally with production build
- Contact platform support if needed

---

**Ready to deploy?** Choose your preferred platform and follow the guide above!
