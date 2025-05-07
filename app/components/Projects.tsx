'use client';

import { projects } from '@/app/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <h2 className="text-3xl pb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
            <div className="mt-4 flex gap-2">
              {project.tags.map((icon, i) => (
                <span key={i} className="text-blue-500 text-sm">
                  {icon}
                </span>
              ))}
            </div>
            {project.githubUrl && (
              <div className="mt-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 