#!/bin/bash

echo "🚀 Netlify Deployment Validation"
echo "=================================="

# Check required files
echo "📁 Checking required files..."
files=("netlify.toml" "package.json" "public/_redirects" ".env.example")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check build process
echo ""
echo "🔧 Testing build process..."
if pnpm build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check dist folder
echo ""
echo "📦 Checking build output..."
required_dist_files=("index.html" "_redirects" "assets")
for file in "${required_dist_files[@]}"; do
    if [ -e "dist/$file" ]; then
        echo "✅ dist/$file exists"
    else
        echo "❌ dist/$file missing"
        exit 1
    fi
done

# Check package.json scripts
echo ""
echo "📝 Checking package.json scripts..."
if jq -e '.scripts.build' package.json > /dev/null; then
    echo "✅ Build script exists"
else
    echo "❌ Build script missing"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Ready for Netlify deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect repository to Netlify"
echo "3. Set environment variables in Netlify UI"
echo "4. Deploy!"
echo ""
echo "Environment variables to set in Netlify:"
echo "- VITE_COMETCHAT_APP_ID"
echo "- VITE_COMETCHAT_REGION"
echo "- VITE_COMETCHAT_AUTH_KEY"
echo "- VITE_COMETCHAT_REST_API_KEY"