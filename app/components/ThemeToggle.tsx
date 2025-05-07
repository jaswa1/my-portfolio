'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After component mounts, we can safely access localStorage
  useEffect(() => {
    setMounted(true);
    // Check if theme preference exists in localStorage
    if (typeof window !== 'undefined' && localStorage.theme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update the document class when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode, mounted]);

  // Don't render the button until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 z-50"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
} 