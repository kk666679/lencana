#!/bin/bash

set -e

# Detect package manager
if [ ! -f package.json ]; then
  echo "No package.json found. Are you in a Node.js project?"
  exit 1
fi

echo "🔍 Checking for outdated npm packages..."
npm outdated || true

read -p "⚠️  Do you want to update all dependencies to their latest compatible versions? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Update cancelled."
  exit 0
fi

# Optionally create a branch
read -p "🌿 Do you want to create a new Git branch before updating? (y/N): " branch_confirm
if [[ "$branch_confirm" == "y" || "$branch_confirm" == "Y" ]]; then
  branch_name="update-dependencies-$(date +%Y%m%d)"
  git checkout -b "$branch_name"
  echo "✅ Switched to new branch: $branch_name"
fi

# Update dependencies
echo "⬆️ Updating all dependencies..."
npm update

# Optionally update devDependencies as well (if desired, but npm update usually handles it)
# npm install

# Install latest versions of everything (if you want to go beyond semver ranges):
# npm install @scope/pkg@latest

# Show new versions
echo "📦 Updated packages:"
npm list --depth=0

# Git add + commit
git add package.json package-lock.json
git commit -m "chore: update dependencies"
echo "✅ Dependencies updated and committed."

# Optional: push to remote
read -p "🚀 Do you want to push the branch to origin? (y/N): " push_confirm
if [[ "$push_confirm" == "y" || "$push_confirm" == "Y" ]]; then
  git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
fi
