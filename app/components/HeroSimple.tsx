'use client';

import React from 'react';
import SimpleNameAnimation from './SimpleNameAnimation';

export default function HeroSimple() {
  return (
    <section className="py-24 px-4 flex items-center justify-center min-h-[60vh] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <SimpleNameAnimation className="mb-4 text-5xl" />
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">AI Engineer Building Intelligent Systems</p>
        <div className="mt-8">
          <a 
            href="#projects" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
} 