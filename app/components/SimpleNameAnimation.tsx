'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface SimpleNameAnimationProps {
  className?: string;
}

export default function SimpleNameAnimation({ className = '' }: SimpleNameAnimationProps) {
  const [isSlashed, setIsSlashed] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const swordSwipeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  
  // Use more particles for a more dramatic effect
  const particleCount = 40; // Increased from the original number
  
  const handleMouseEnter = () => {
    if (isSlashed) return;
    
    setIsSlashed(true);
    
    // Create a more dramatic sword swipe
    if (swordSwipeRef.current) {
      gsap.fromTo(
        swordSwipeRef.current,
        { 
          opacity: 0,
          scale: 0.8,
          rotate: -15,
          x: '-300%',
          y: '100%',
        },
        { 
          opacity: 1,
          scale: 1.2, // Larger scale for more impact
          rotate: 35,
          x: '200%',
          y: '-80%',
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(swordSwipeRef.current, { 
              opacity: 0, 
              duration: 0.3,
              delay: 0.1 
            });
          }
        }
      );
    }
    
    // More intense glow effect with pulsing
    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 0.9, // More intense glow
          scale: 1.1, 
          duration: 0.3,
          onComplete: () => {
            // Create a pulsing effect
            gsap.to(glowRef.current, {
              opacity: 0.5,
              scale: 1.05,
              duration: 0.5,
              repeat: 2,
              yoyo: true,
              ease: "sine.inOut",
              onComplete: () => {
                gsap.to(glowRef.current, { 
                  opacity: 0, 
                  scale: 0.9, 
                  duration: 0.8,
                  delay: 0.2
                });
              }
            });
          }
        }
      );
    }
    
    // Screen shake effect
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: 0, y: 0 },
        { 
          x: "+=3", 
          y: "-=3", 
          duration: 0.08, 
          repeat: 3, 
          yoyo: true,
          ease: "rough",
          onComplete: () => {
            gsap.to(containerRef.current, { x: 0, y: 0, duration: 0.2 });
          }
        }
      );
    }
    
    // Show particles with a slight delay
    setTimeout(() => {
      setParticlesVisible(true);
      // Reset after animation completes
      setTimeout(() => {
        setParticlesVisible(false);
        setIsSlashed(false);
      }, 2000);
    }, 200);
  };
  
  return (
    <div 
      className={`relative overflow-hidden cursor-pointer select-none ${className}`} 
      onMouseEnter={handleMouseEnter}
      ref={containerRef}
    >
      <div className="text-center relative z-10">
        <motion.div 
          ref={nameRef}
          className="relative inline-block text-4xl font-bold"
        >
          {/* Sword slash effect */}
          <div 
            ref={swordSwipeRef}
            className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 z-20 blur-sm opacity-0 overflow-visible"
            style={{ 
              boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.7), 0 0 30px 8px rgba(59, 130, 246, 0.5)', 
              transform: 'rotate(15deg)' 
            }}
          />
          
          {/* Glow effect */}
          <div 
            ref={glowRef}
            className="absolute inset-0 w-full h-full rounded-full opacity-0 z-0"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)',
              filter: 'blur(8px)',
            }}
          />
          
          {/* Name with slashing effect between 'l' and 'i' */}
          <span>Jaswa</span>
          <span className={`transition-all duration-300 ${isSlashed ? 'opacity-0 scale-110' : 'opacity-100'}`}>l</span>
          <span className={`transition-all duration-300 ${isSlashed ? 'opacity-0 scale-110' : 'opacity-100'}`}>i</span>
          <span>ne</span>
        </motion.div>
      </div>
      
      {/* Particle effect */}
      {particlesVisible && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(particleCount)].map((_, i) => {
            const size = Math.random() * 4 + 2; // Slightly larger particles
            const duration = Math.random() * 1.5 + 1;
            const xDirection = Math.random() > 0.5 ? 1 : -1;
            const yDirection = -1; // Always go up to create a more dramatic "slashed" effect
            const xDistance = Math.random() * 150 + 50;
            const yDistance = Math.random() * 120 + 80;
            const delay = Math.random() * 0.3;
            const opacity = Math.random() * 0.4 + 0.6; // Brighter particles
            
            // More colors for dramatic effect
            const colors = [
              'bg-blue-400', 'bg-blue-300', 'bg-blue-500', 
              'bg-indigo-400', 'bg-purple-400', 'bg-cyan-400'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${color}`}
                initial={{ 
                  opacity, 
                  x: '50%', 
                  y: '50%', 
                  scale: 0 
                }}
                animate={{ 
                  opacity: [opacity, 0],
                  scale: [0, 1],
                  x: [`50%`, `calc(50% + ${xDirection * xDistance}px)`],
                  y: [`50%`, `calc(50% + ${yDirection * yDistance}px)`],
                }}
                transition={{ 
                  duration,
                  delay,
                  ease: 'easeOut' 
                }}
                style={{ 
                  width: `${size}px`, 
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 2}px rgba(59, 130, 246, 0.8)` // Glow effect for particles
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
} 