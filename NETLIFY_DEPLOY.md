# 🚀 Quick Netlify Deployment Guide

This repository is fully configured for Netlify deployment. Follow these simple steps:

## Option 1: One-Click Deploy (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yethikrishna/yetichat-v1)

## Option 2: Manual Deployment

### Prerequisites
- Netlify account ([signup here](https://app.netlify.com/signup))
- CometChat account ([signup here](https://app.cometchat.com/))

### Steps

1. **Fork/Clone this repository**

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select this repository

3. **Build Settings** (Auto-configured)
   - Build command: `pnpm run build`
   - Publish directory: `dist`
   - These are already set in `netlify.toml`

4. **Environment Variables** (Required for production)
   Go to Site Settings > Environment Variables and add:
   ```
   VITE_COMETCHAT_APP_ID=your_app_id_here
   VITE_COMETCHAT_REGION=us
   VITE_COMETCHAT_AUTH_KEY=your_auth_key_here
   VITE_COMETCHAT_REST_API_KEY=your_rest_api_key_here
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (usually 2-3 minutes)
   - Your app will be live!

## Getting CometChat API Keys

1. Visit [CometChat Dashboard](https://app.cometchat.com/)
2. Create account or log in
3. Create new app or select existing one
4. Go to "API & Auth Keys" section
5. Copy the required keys to Netlify environment variables

## Features Included

✅ **Optimized Build Configuration**
- PNPM package manager for faster builds
- Asset optimization and compression
- Modern JavaScript/CSS output

✅ **SPA Routing Support**
- Proper redirects for client-side routing
- Backup `_redirects` file included

✅ **Performance Optimizations**
- Static asset caching (1 year)
- App file caching (1 day)
- Gzip compression enabled

✅ **Security Headers**
- XSS protection
- Content type validation
- Frame options security
- CSP headers included

✅ **SEO Ready**
- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter card support

## Build Process

The repository uses these technologies:
- **React 18** with TypeScript
- **Vite** for building (super fast!)
- **Tailwind CSS** for styling
- **CometChat** for real-time messaging

## Troubleshooting

**Build fails?**
- Check that all environment variables are set
- Verify CometChat API keys are correct
- Contact support if issues persist

**App loads but chat doesn't work?**
- Verify CometChat environment variables in Netlify
- Check CometChat app is active in dashboard
- Ensure correct region is set

## Support

- 📧 Create an issue in this repository
- 📖 Check [full deployment docs](docs/DEPLOYMENT.md)
- 💬 [CometChat Documentation](https://www.cometchat.com/docs/)

---

**Ready to deploy? Click the button above! 🚀**