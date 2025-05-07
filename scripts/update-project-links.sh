#!/bin/bash

# Update Project Links Script
# This script updates the project data file with GitHub repository links

# Set GitHub username
GITHUB_USERNAME="jaswa1"

# Path to the project data file
PROJECT_DATA_FILE="app/data/projects.ts"

# Check if the project data file exists
if [ ! -f "$PROJECT_DATA_FILE" ]; then
    echo "Project data file not found at $PROJECT_DATA_FILE"
    exit 1
fi

# Create a backup of the original file
cp "$PROJECT_DATA_FILE" "${PROJECT_DATA_FILE}.bak"
echo "Backup created at ${PROJECT_DATA_FILE}.bak"

# Map project titles to repository names
declare -A repo_mapping=(
    ["MTMT (Metrics That Matter)"]="mtmt-dashboard"
    ["E.S.T.E.E AI Innovation Hackathon"]="estee-ai-hackathon"
    ["HERO - ELC's Forecasting Suite"]="hero-forecasting"
    ["FENCE - Feature Evaluation Platform"]="fence-platform"
    ["SpeEmo - Emotion Recognition System"]="speemo"
    ["Real-time Stroke Recovery System"]="stroke-recovery-system"
)

# Temporary file for modifications
TMP_FILE=$(mktemp)

# Process the project data file
while IFS= read -r line; do
    # Write the current line to the temporary file
    echo "$line" >> "$TMP_FILE"
    
    # Check if this line contains a project title we need to update
    for project_title in "${!repo_mapping[@]}"; do
        if [[ "$line" == *"title: \"$project_title\""* ]]; then
            # Get the repository name for this project
            repo_name="${repo_mapping[$project_title]}"
            
            # Read the next line to check if it contains a description
            read -r next_line
            echo "$next_line" >> "$TMP_FILE"
            
            # Check if there's already a githubUrl field in the next line
            read -r after_description
            
            if [[ "$after_description" != *"githubUrl:"* ]]; then
                # Extract indentation from the description line
                indentation=$(echo "$next_line" | sed 's/[^ ].*//')
                
                # Add the GitHub URL line with proper indentation
                echo "${indentation}githubUrl: \"https://github.com/$GITHUB_USERNAME/${repo_name}\"," >> "$TMP_FILE"
                
                # Write the line after description
                echo "$after_description" >> "$TMP_FILE"
            else
                # If githubUrl already exists, just write the next line
                echo "$after_description" >> "$TMP_FILE"
            fi
            
            # Skip the next two lines since we've already processed them
            continue 2
        fi
    done
done < "$PROJECT_DATA_FILE"

# Replace the original file with the modified one
mv "$TMP_FILE" "$PROJECT_DATA_FILE"

echo "Project data file updated with GitHub repository links!"
echo "You can check the changes by comparing with the backup file." 