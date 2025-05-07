#!/bin/bash

# GitHub repository population script
# This script populates GitHub repositories with basic README files

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

# Temporary directory for repository cloning
TEMP_DIR=$(mktemp -d)
echo "Using temporary directory: $TEMP_DIR"

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

# Map project names to friendly names
friendly_names=(
    "MTMT Dashboard"
    "Estée Lauder AI Hackathon"
    "HERO Forecasting"
    "Fence Platform"
    "Speemo"
    "Stroke Recovery System"
)

# Technologies used in each project
technologies=(
    "React, Next.js, TypeScript, OpenAI API, Tailwind CSS, Vercel"
    "Python, Flask, Hugging Face, spaCy, React, Material UI"
    "Python, TensorFlow, scikit-learn, Pandas, Plotly, Flask API"
    "Natural Language Processing, Python, MongoDB, Express.js, React, Node.js"
    "Speech Processing, PyTorch, Signal Processing, JavaScript, WebRTC"
    "Computer Vision, TensorFlow, Python, Django, React Native"
)

# For each project, clone the repo, create a README, and push
for i in "${!repos[@]}"; do
    repo="${repos[$i]}"
    description="${descriptions[$i]}"
    friendly_name="${friendly_names[$i]}"
    technology="${technologies[$i]}"
    
    echo "Processing repository: $repo"
    
    # Clone the repository
    REPO_DIR="$TEMP_DIR/$repo"
    git clone "https://github.com/$GITHUB_USERNAME/$repo.git" "$REPO_DIR"
    
    if [ $? -ne 0 ]; then
        echo "Failed to clone repository: $repo"
        continue
    fi
    
    cd "$REPO_DIR"
    
    # Create README.md
    cat > README.md << EOL
# ${friendly_name}

## Overview
${description}

## Technologies
${technology}

## Features
- Feature 1: Description pending
- Feature 2: Description pending
- Feature 3: Description pending

## Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/$GITHUB_USERNAME/$repo.git

# Navigate to project directory
cd $repo

# Install dependencies
npm install  # or yarn install

# Start the development server
npm run dev  # or yarn dev
\`\`\`

## Screenshot
(Coming soon)

## Demo
(Coming soon)

## License
MIT
EOL

    # Commit and push the README
    git add README.md
    git commit -m "Initial commit: Add README.md"
    git push
    
    echo "README added to $repo"
    echo "-----------------------------------"
done

# Clean up
rm -rf "$TEMP_DIR"
echo "All repositories populated with README files!"
echo "Visit https://github.com/$GITHUB_USERNAME to view your repositories." 