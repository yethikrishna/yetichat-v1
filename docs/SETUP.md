# 🔧 Yetichat Setup Guide

This guide provides detailed instructions for setting up Yetichat locally and configuring CometChat integration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [CometChat Account Setup](#cometchat-account-setup)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before setting up Yetichat, ensure you have the following installed:

### Required Software

- **Node.js**: Version 18.0.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **pnpm** (Recommended) or npm
  - Install pnpm: `npm install -g pnpm`
  - Verify installation: `pnpm --version`

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Development Tools (Optional but Recommended)

- **VS Code**: Code editor with excellent TypeScript support
- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

## CometChat Account Setup

### Step 1: Create CometChat Account

1. Visit [CometChat Dashboard](https://app.cometchat.com/)
2. Click "Sign Up" to create a new account
3. Verify your email address
4. Complete the onboarding process

### Step 2: Create a New Application

1. In the CometChat Dashboard, click "Add New App"
2. Fill in the application details:
   - **App Name**: `Yetichat` (or your preferred name)
   - **Region**: Choose the region closest to your users
   - **Description**: "Professional chat application"
3. Click "Create App"

### Step 3: Get API Keys

1. Select your newly created app from the dashboard
2. Navigate to "API & Auth Keys" in the left sidebar
3. Note down the following values (you'll need them later):
   - **App ID**: Found in the app overview
   - **Region**: Your selected region (e.g., "us", "eu")
   - **Auth Key**: From the API & Auth Keys section
   - **REST API Key**: From the API & Auth Keys section

### Step 4: Configure App Settings (Optional)

1. **Roles & Permissions**: Configure user roles if needed
2. **Extensions**: Enable any additional features you want to use
3. **Authentication**: Configure authentication settings

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/username/yetichat.git

# Navigate to the project directory
cd yetichat
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Step 3: Environment Configuration

1. **Copy the environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your CometChat credentials:
   ```env
   # CometChat Configuration
   VITE_COMETCHAT_APP_ID=your_app_id_here
   VITE_COMETCHAT_REGION=your_region_here
   VITE_COMETCHAT_AUTH_KEY=your_auth_key_here
   VITE_COMETCHAT_REST_API_KEY=your_rest_api_key_here

   # Application Configuration
   VITE_APP_NAME=Yetichat
   VITE_APP_VERSION=1.0.0
   ```

3. **Replace the placeholder values**:
   - `your_app_id_here`: Your CometChat App ID
   - `your_region_here`: Your CometChat region (e.g., "us", "eu")
   - `your_auth_key_here`: Your CometChat Auth Key
   - `your_rest_api_key_here`: Your CometChat REST API Key

## Running the Application

### Development Mode

```bash
# Start the development server
pnpm dev

# Or using npm
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
pnpm build

# Preview the production build
pnpm preview
```

### Code Linting

```bash
# Run ESLint
pnpm lint

# Fix linting issues automatically
pnpm lint --fix
```

## Application Structure

### Key Directories

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat-related components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API and CometChat services
├── types/              # TypeScript type definitions
└── utils/              # Helper functions and constants
```

### Key Files

- **`src/services/cometchat.ts`**: CometChat SDK initialization
- **`src/hooks/useCometChat.ts`**: Custom hook for CometChat integration
- **`src/components/auth/AuthWrapper.tsx`**: Authentication wrapper
- **`src/components/chat/CometChatContainer.tsx`**: Main chat container

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading

**Problem**: Application not connecting to CometChat.

**Solution**:
- Ensure your `.env` file is in the root directory
- Verify all environment variables have the `VITE_` prefix
- Restart the development server after changing `.env`

#### 2. CometChat Initialization Failed

**Problem**: Console shows CometChat initialization errors.

**Solution**:
- Verify your App ID and Auth Key are correct
- Check that your region setting matches your CometChat app
- Ensure your CometChat app is active in the dashboard

#### 3. Build Errors

**Problem**: TypeScript compilation errors.

**Solution**:
```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check TypeScript configuration
pnpm tsc --noEmit
```

#### 4. Login Issues

**Problem**: Cannot log in or create users.

**Solution**:
- Verify your REST API Key is correct
- Check network connectivity
- Enable CORS in your CometChat app settings if needed

### Getting Help

If you encounter issues not covered here:

1. **Check Console Logs**: Open browser developer tools and check for error messages
2. **CometChat Documentation**: Visit [CometChat Docs](https://www.cometchat.com/docs/)
3. **GitHub Issues**: Search existing issues or create a new one
4. **CometChat Support**: Contact CometChat support for SDK-related issues

## Development Tips

### Recommended Development Workflow

1. **Start with Authentication**: Ensure login/logout works properly
2. **Test Basic Messaging**: Send messages between test users
3. **Customize UI**: Modify components to match your design requirements
4. **Add Features**: Implement additional features as needed

### Performance Optimization

- Use React.memo for components that don't need frequent re-renders
- Implement lazy loading for large lists
- Optimize images and assets
- Use the production build for performance testing

### Code Quality

- Run `pnpm lint` before committing changes
- Use TypeScript strictly - avoid `any` types
- Write meaningful component and function names
- Add comments for complex logic

## Next Steps

After successful setup:

1. **Customize the UI**: Modify components to match your brand
2. **Add Features**: Implement additional chat features
3. **Deploy**: Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide
4. **Monitor**: Set up error tracking and analytics

---

**Need more help?** Check the [main README](../README.md) or open an issue on GitHub.
