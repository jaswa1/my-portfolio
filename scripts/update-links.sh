#!/bin/bash

# Simple script to update GitHub repository links in projects.ts

# Set GitHub username
GITHUB_USERNAME="jaswa1"

# Project data file
FILE="app/data/projects.ts"

# Make a backup
cp "$FILE" "${FILE}.bak"
echo "Created backup at ${FILE}.bak"

# Insert GitHub URLs after each description
sed -i '' 's/\(title: "MTMT (Metrics That Matter)".* company: "Estee Lauder"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/mtmt-dashboard"/' "$FILE"
sed -i '' 's/\(title: "E.S.T.E.E AI Innovation Hackathon".* company: "Estee Lauder"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/estee-ai-hackathon"/' "$FILE"
sed -i '' 's/\(title: "HERO - ELC'"'"'s Forecasting Suite".* company: "Estee Lauder"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/hero-forecasting"/' "$FILE"
sed -i '' 's/\(title: "FENCE - Feature Evaluation Platform".* company: "Estee Lauder"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/fence-platform"/' "$FILE"
sed -i '' 's/\(title: "SpeEmo - Emotion Recognition System".* company: "Research"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/speemo"/' "$FILE"
sed -i '' 's/\(title: "Real-time Stroke Recovery System".* company: "ctrlCV"\)/\1,\n    githubUrl: "https:\/\/github.com\/'"$GITHUB_USERNAME"'\/stroke-recovery-system"/' "$FILE"

echo "GitHub repository links added to projects.ts" 