#!/bin/bash

# 🚀 Yetichat GitHub Publication Script
# This script helps you publish Yetichat to GitHub

echo "🐾 Yetichat GitHub Publication Helper"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the yetichat root directory"
    exit 1
fi

# Run verification
echo "🔍 Running repository verification..."
echo ""
node scripts/verify-repository.js

# Check if verification passed
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Verification failed. Please fix the issues above before proceeding."
    exit 1
fi

echo ""
echo "🎉 Verification passed! Your repository is ready for GitHub."
echo ""

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "🛠️  GitHub CLI detected! You can use the quick setup:"
    echo ""
    echo "Quick Setup Commands:"
    echo "--------------------"
    echo "1. gh auth login  # Login to GitHub (if not already logged in)"
    echo "2. gh repo create yetichat --public --description \"Professional chat application built with CometChat React UI Kit - A modern, real-time messaging platform\""
    echo "3. gh repo edit --add-topic cometchat,react,typescript,chat,real-time,messaging,ui-kit"
    echo "4. git remote add origin https://github.com/\$(gh api user --jq .login)/yetichat.git"
    echo "5. git push -u origin main"
    echo ""
    
    read -p "🤔 Would you like to run the automated setup? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Running automated GitHub setup..."
        
        # Check if user is logged in
        if ! gh auth status &> /dev/null; then
            echo "🔐 Please login to GitHub first:"
            gh auth login
        fi
        
        # Create repository
        echo "📝 Creating GitHub repository..."
        gh repo create yetichat --public --description "Professional chat application built with CometChat React UI Kit - A modern, real-time messaging platform"
        
        # Add topics
        echo "🏷️  Adding repository topics..."
        gh repo edit --add-topic cometchat,react,typescript,chat,real-time,messaging,ui-kit
        
        # Get username and add remote
        USERNAME=$(gh api user --jq .login)
        echo "🔗 Adding remote origin..."
        git remote add origin https://github.com/$USERNAME/yetichat.git
        
        # Push code
        echo "📤 Pushing code to GitHub..."
        git push -u origin main
        
        echo ""
        echo "🎉 SUCCESS! Your repository is now live on GitHub!"
        echo "🔗 Repository URL: https://github.com/$USERNAME/yetichat"
        echo ""
        echo "📋 Next Steps:"
        echo "1. Visit your repository and verify everything looks good"
        echo "2. Deploy your application using the deployment guide (docs/DEPLOYMENT.md)"
        echo "3. Update the README with your actual deployment URL"
        echo "4. Share your repository with the world!"
        
    else
        echo "📋 Manual Setup Instructions:"
        echo "1. Visit https://github.com/new"
        echo "2. Repository name: yetichat"
        echo "3. Description: Professional chat application built with CometChat React UI Kit - A modern, real-time messaging platform"
        echo "4. Make it public"
        echo "5. DO NOT initialize with README (we already have one)"
        echo "6. Create repository"
        echo "7. Follow the instructions to push existing repository"
        echo ""
        echo "📖 For detailed instructions, see: docs/GITHUB_SETUP.md"
    fi
else
    echo "📋 Manual Setup Required (GitHub CLI not found):"
    echo ""
    echo "Option 1: Install GitHub CLI"
    echo "------------------------"
    echo "Visit: https://cli.github.com/"
    echo "Then run this script again for automated setup"
    echo ""
    echo "Option 2: Manual Setup"
    echo "---------------------"
    echo "1. Visit https://github.com/new"
    echo "2. Repository name: yetichat"
    echo "3. Description: Professional chat application built with CometChat React UI Kit - A modern, real-time messaging platform"
    echo "4. Make it public"
    echo "5. DO NOT initialize with README (we already have one)"
    echo "6. Create repository"
    echo "7. Run these commands:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/yetichat.git"
    echo "   git push -u origin main"
    echo ""
    echo "📖 For detailed instructions, see: docs/GITHUB_SETUP.md"
fi

echo ""
echo "🙏 Thank you for using Yetichat!"
echo "📞 Need help? Check the documentation or open an issue on GitHub."
