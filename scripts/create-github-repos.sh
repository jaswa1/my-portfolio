#!/bin/bash

# GitHub repository creation script
# This script creates GitHub repositories for portfolio projects

# Set GitHub username
GITHUB_USERNAME="jaswa1"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub first using 'gh auth login'"
    exit 1
fi

# Define repository names and descriptions in parallel arrays
repos=(
    "mtmt-dashboard"
    "estee-ai-hackathon"
    "hero-forecasting"
    "fence-platform"
    "speemo"
    "stroke-recovery-system"
)

descriptions=(
    "LLM-powered executive dashboard enabling C-Suite leaders to access key market insights through natural language interactions."
    "AI innovation hackathon project showcasing AI's potential to streamline enterprise insight discovery."
    "Strategic forecasting tool for supply chain, finance, R&D, and strategy units using ML-driven forecasting."
    "AI-driven product intelligence solution to evaluate consumer sentiment in real-time for product development."
    "Emotion recognition system that interprets affective cues in speech using NLP and sentiment analysis."
    "Real-time stroke recovery system using AI/ML models to process hand and eye movement data."
)

# Create repositories
for i in "${!repos[@]}"; do
    repo="${repos[$i]}"
    description="${descriptions[$i]}"
    
    echo "Creating repository: $repo"
    echo "Description: $description"
    
    # Create the repository
    gh repo create "$GITHUB_USERNAME/$repo" --public --description "$description" --confirm
    
    echo "Repository created: https://github.com/$GITHUB_USERNAME/$repo"
    echo "-----------------------------------"
done

echo "All repositories created successfully!"
echo "You can now clone them and add your project code."

cd ~/my-portfolio
npx vercel --cwd ./public