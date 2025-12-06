#!/bin/bash
# Script to deploy to docs folder for GitHub Pages branch deployment

# Build the site
npm run build

# Copy dist contents to docs folder
rm -rf docs
mkdir -p docs
cp -r dist/* docs/

echo "✅ Files copied to docs folder"
echo "📝 Commit and push the docs folder to deploy"

