#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure we have the project data
let projectData;
try {
  // This loads the project data from the data folder
  // Note: This assumes projects.ts exports a default array of projects
  const projectDataPath = path.join(process.cwd(), 'data', 'projects.ts');
  const fileContent = fs.readFileSync(projectDataPath, 'utf8');
  
  // Extract the projects array using regex (simple approach)
  const projectsMatch = fileContent.match(/export const projects\s*=\s*(\[[\s\S]*?\]);/);
  
  if (!projectsMatch) {
    throw new Error('Could not parse projects array from data file');
  }
  
  // Use Node.js to evaluate the array (in a controlled way)
  const projectsArrayString = projectsMatch[1].replace(/export default/g, '');
  projectData = eval(`(${projectsArrayString})`);
  
} catch (error) {
  console.error('Error loading project data:', error);
  process.exit(1);
}

// Create the pages directory if it doesn't exist
const pagesDir = path.join(process.cwd(), 'app', 'projects');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
  console.log('Created projects directory');
}

// Generate a page for each project
projectData.forEach(project => {
  const projectDir = path.join(pagesDir, project.id);
  
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  
  const pagePath = path.join(projectDir, 'page.tsx');
  
  // Create the page component
  const pageContent = `import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: '${project.title} | Raj Jaswal',
  description: '${project.description.replace(/'/g, "\\'")}',
};

export default function ProjectPage() {
  // Find the project data
  const project = projects.find(p => p.id === '${project.id}');
  
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="space-y-8">
        {/* Back button */}
        <Link href="/#projects">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        
        {/* Project header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{project.title}</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {project.description}
          </p>
        </div>
        
        {/* GitHub link if available */}
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </Link>
        )}
        
        {/* Project image */}
        <div className="overflow-hidden rounded-lg border">
          <Image
            src={project.imageSrc}
            alt={project.title}
            width={1200}
            height={630}
            className="w-full object-cover"
          />
        </div>
        
        {/* Project details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
            
            <h3 className="text-xl font-bold">Key Features</h3>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400 space-y-1">
              {project.features ? (
                project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))
              ) : (
                <>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold">Project Timeline</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {project.date || 'Completed in 2023'}
            </p>
            
            {project.liveUrl && (
              <div className="pt-4">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto">Visit Live Site</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(pagePath, pageContent);
  console.log(`Generated page for ${project.id}`);
});

// Update the project card component to link to the detail pages
try {
  const projectCardPath = path.join(process.cwd(), 'app', 'components', 'ProjectCard.tsx');
  
  if (fs.existsSync(projectCardPath)) {
    let cardContent = fs.readFileSync(projectCardPath, 'utf8');
    
    // Check if we need to update the card to link to the project page
    if (!cardContent.includes('/projects/')) {
      // Replace the card content with an updated version that links to project pages
      cardContent = cardContent.replace(
        /export function ProjectCard\(\{ project \}: ProjectCardProps\) \{/,
        `export function ProjectCard({ project }: ProjectCardProps) {
  // Generate the project link
  const projectLink = project.liveUrl || project.githubUrl || \`/projects/\${project.id}\`;`
      );
      
      // Update the card container to be a link
      cardContent = cardContent.replace(
        /<div className="group relative overflow-hidden rounded-lg border/,
        `<Link href={projectLink} className="block">
        <div className="group relative overflow-hidden rounded-lg border`
      );
      
      // Close the Link tag
      cardContent = cardContent.replace(
        /<\/div>\s*\);\s*\}/,
        `</div>
      </Link>
    );
}`
      );
      
      // Add the import for Link
      if (!cardContent.includes("import Link from 'next/link';")) {
        cardContent = cardContent.replace(
          /import/,
          "import Link from 'next/link';\nimport"
        );
      }
      
      fs.writeFileSync(projectCardPath, cardContent);
      console.log('Updated ProjectCard component to link to detail pages');
    } else {
      console.log('ProjectCard component already links to detail pages');
    }
  }
} catch (error) {
  console.error('Error updating ProjectCard component:', error);
}

console.log('Project pages generated successfully!'); 