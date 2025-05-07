'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedName() {
  const [isSlashed, setIsSlashed] = useState(false);
  const controls = useAnimation();

  // Function to handle hover or click
  const handleSwipe = async () => {
    if (isSlashed) return; // Prevent repeated animation

    await controls.start({
      pathLength: 1,
      transition: { duration: 0.4 },
    });
    
    // After sword swipe, set slashed to true to show the 'i' instead of 'l'
    setIsSlashed(true);
  };

  return (
    <div 
      className="relative text-6xl font-bold cursor-pointer"
      onMouseEnter={handleSwipe}
    >
      <div className="flex">
        {/* First part of name that doesn't change */}
        <span>Jaswa</span>
        
        {/* The conditional 'l' or 'i' */}
        <div className="relative">
          {/* Show 'l' when not slashed */}
          <span className={`absolute ${isSlashed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>l</span>
          
          {/* Show 'i' when slashed */}
          <span className={`absolute ${isSlashed ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>i</span>
        </div>
      </div>

      {/* SVG for sword swipe animation */}
      <svg 
        className="absolute insert-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 20" 
        style={{ 
          top: '-20%', 
          left: '70%', // Start at ~70% of the width (near "l")
          width: '30%'  // Width of the swipe
        }}
      >
        <motion.path
          d="M0,10 L30,10" 
          stroke="#ff4500"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>

      {/* Optional: Add small block that falls off after cut */}
      {isSlashed && (
        <motion.div 
          className="absolute bg-gray-800 w-1 h-1"
          style={{ top: '0', left: '83%' }}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [0, 30], 
            rotate: 180,
            transition: { duration: 0.8 } 
          }}
        />
      )}
    </div>
  );
} 