import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Raj Jaswal</h1>
        <p className="text-xl text-center">AI Engineer Building Intelligent Systems</p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "MTMT (Metrics That Matter)",
              description: "LLM-powered executive dashboard enabling C-Suite leaders to access key market insights through natural language interactions.",
              tags: ["LLM", "Executive Dashboard", "NLP", "Analytics"],
              githubUrl: "https://github.com/jaswa1/mtmt-dashboard"
            },
            {
              title: "E.S.T.E.E AI Innovation Hackathon",
              description: "Conceived and developed a working proof-of-concept showcasing AI's potential to streamline enterprise insight discovery.",
              tags: ["AI", "Hackathon", "Enterprise", "Innovation"],
              githubUrl: "https://github.com/jaswa1/estee-ai-hackathon"
            },
            {
              title: "HERO - ELC's Forecasting Suite",
              description: "Directed a multi-disciplinary team in delivering a strategic forecasting tool used by Supply Chain, Finance, R&D, and Strategy units.",
              tags: ["ML", "Forecasting", "Cross-functional", "Supply Chain"],
              githubUrl: "https://github.com/jaswa1/hero-forecasting"
            }
          ].map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
        <a href="mailto:raj@jaswal.ai" className="text-blue-600 dark:text-blue-400 text-xl underline">
          raj@jaswal.ai
        </a>
      </section>
    </main>
  );
}
