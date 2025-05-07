'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedNameAlt() {
  const [isSlashed, setIsSlashed] = useState(false);
  const [isMorphed, setIsMorphed] = useState(false);
  const swordControls = useAnimation();
  const textControls = useAnimation();

  // Function to handle hover or click
  const handleSwipe = async () => {
    if (isSlashed) return; // Prevent repeated animation

    // Animate the sword slash
    await swordControls.start({
      pathLength: 1,
      transition: { duration: 0.3 },
    });
    
    // Set slashed to trigger the separation animation
    setIsSlashed(true);
    
    // Wait a moment, then morph "al" to "ai"
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsMorphed(true);
  };

  return (
    <div 
      className="relative text-6xl font-bold cursor-pointer"
      onMouseEnter={handleSwipe}
    >
      <div className="flex">
        {/* First part of name - "jasw" */}
        <motion.span
          animate={isSlashed ? { x: -10 } : { x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          Jasw
        </motion.span>
        
        {/* Second part that morphs from "al" to "ai" */}
        <motion.div
          className="relative"
          animate={isSlashed ? { 
            x: 20,
            transition: { duration: 0.5, type: "spring" } 
          } : { x: 0 }}
        >
          {/* Show "al" when not morphed */}
          <motion.span 
            className="absolute"
            animate={isMorphed ? { 
              opacity: 0,
              scale: 0.8,
              rotateY: 180
            } : { 
              opacity: 1, 
              scale: 1,
              rotateY: 0
            }}
            transition={{ duration: 0.4 }}
          >
            al
          </motion.span>
          
          {/* Show "ai" when morphed */}
          <motion.span 
            className="absolute"
            initial={{ opacity: 0, rotateY: -180, scale: 0.8 }}
            animate={isMorphed ? { 
              opacity: 1, 
              rotateY: 0,
              scale: 1
            } : { 
              opacity: 0,
              rotateY: -180,
              scale: 0.8
            }}
            transition={{ duration: 0.4 }}
          >
            ai
          </motion.span>
        </motion.div>
      </div>

      {/* SVG for vertical sword swipe animation */}
      <svg 
        className="absolute pointer-events-none"
        style={{ 
          top: '0%', 
          left: '42%', // Position between "jasw" and "al"
          height: '100%',
          width: '30px'
        }}
        viewBox="0 0 10 60"
      >
        <motion.path
          d="M5,0 L5,60" 
          stroke="#ff4500"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={swordControls}
        />
      </svg>

      {/* Particles effect when the cut happens */}
      {isSlashed && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              style={{ 
                top: '50%', 
                left: '42%',
              }}
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: [1, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * (10 + Math.random() * 20)],
                y: [0, (i < 3 ? -1 : 1) * (10 + Math.random() * 20)],
                transition: { 
                  duration: 0.6 + Math.random() * 0.5,
                  ease: "easeOut" 
                }
              }}
            />
          ))}
        </>
      )}
    </div>
  );
} 