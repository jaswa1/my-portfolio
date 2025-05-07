'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Trail } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

// The main 3D text component
function AnimatedText3D({ darkMode }: { darkMode: boolean }) {
  const [slashed, setSlashed] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const swordRef = useRef<THREE.Group>(null);
  const letterLRef = useRef<THREE.Mesh>(null);
  const letterIRef = useRef<THREE.Mesh>(null);
  
  // Handle the sword animation
  useFrame((state) => {
    if (!groupRef.current || !swordRef.current) return;
    
    // Rotate the whole group slowly for a floating effect
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    
    // Animate the sword if not slashed yet
    if (!slashed && swordRef.current) {
      swordRef.current.position.x = Math.sin(state.clock.elapsedTime) * 0.5;
      swordRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 0.2 + 0.5;
    }
  });

  // Handle the slash interaction
  const handleSlash = () => {
    if (slashed) return;
    
    if (swordRef.current) {
      // Position the sword for the slash
      swordRef.current.position.x = -0.8;
      swordRef.current.position.y = 0.5;
      
      // Animate the sword slashing through
      const startTime = Date.now();
      const slashDuration = 500; // ms
      
      const slashInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / slashDuration, 1);
        
        if (swordRef.current) {
          swordRef.current.position.x = -0.8 + progress * 1.6; // Move from left to right
        }
        
        // When animation completes
        if (progress === 1) {
          clearInterval(slashInterval);
          setSlashed(true);
          
          // Show effects of the slash
          if (letterLRef.current) {
            letterLRef.current.visible = false;
          }
          if (letterIRef.current) {
            letterIRef.current.visible = true;
          }
        }
      }, 16);
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={handleSlash}>
      {/* "Jaswa" part */}
      <Text 
        position={[-0.5, 0, 0]} 
        fontSize={0.5} 
        color={darkMode ? "#ffffff" : "#000000"}
        font="/fonts/Roboto-Bold.ttf"
        anchorX="center" 
        anchorY="middle"
      >
        Jaswa
      </Text>
      
      {/* The "l" that will be slashed */}
      <mesh 
        ref={letterLRef} 
        position={[0.7, 0, 0]}
        visible={!slashed}
      >
        <Text 
          fontSize={0.5} 
          color={darkMode ? "#ffffff" : "#000000"}
          font="/fonts/Roboto-Bold.ttf"
          anchorX="center" 
          anchorY="middle"
        >
          l
        </Text>
      </mesh>
      
      {/* The "i" that appears after slash */}
      <mesh 
        ref={letterIRef} 
        position={[0.7, 0, 0]}
        visible={slashed}
      >
        <Text 
          fontSize={0.5} 
          color={darkMode ? "#ffffff" : "#000000"}
          font="/fonts/Roboto-Bold.ttf"
          anchorX="center" 
          anchorY="middle"
        >
          i
        </Text>
      </mesh>
      
      {/* The sword that does the slashing */}
      <group ref={swordRef} position={[-2, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        {/* Sword blade */}
        <mesh>
          <boxGeometry args={[0.6, 0.05, 0.02]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Sword handle */}
        <mesh position={[-0.35, 0, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.05]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        
        {/* Sword trail effect */}
        <Trail 
          width={0.2}
          color={new THREE.Color("#ff4500")}
          length={4}
          decay={1}
          attenuation={(width) => width}
        >
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#ff4500" />
          </mesh>
        </Trail>
      </group>
      
      {/* Flying particles after slash */}
      {slashed && Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            0.7 + Math.random() * 0.1, 
            0.3 - Math.random() * 0.2, 
            Math.random() * 0.1
          ]}
          scale={[0.03, 0.08, 0.01]}
        >
          <boxGeometry />
          <meshStandardMaterial color="#ff4500" />
        </mesh>
      ))}
    </group>
  );
}

// Let's use a simpler 2D version of the animation since the 3D one isn't showing up properly
export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSlashed, setIsSlashed] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    setMounted(true);
    // Check if dark mode is enabled
    if (typeof window !== 'undefined') {
      setDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  // Function to handle hover
  const handleSwipe = async () => {
    if (isSlashed) return; // Prevent repeated animation

    await controls.start({
      pathLength: 1,
      transition: { duration: 0.4 },
    });
    
    // After sword swipe, set slashed to show the 'i' instead of 'l'
    setIsSlashed(true);
  };
  
  if (!mounted) return null;

  return (
    <div className="relative w-screen h-[100vh] flex items-center">
      {/* Left Column (Bio Text) */}
      <div className="w-1/2 pl-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 className="text-6xl font-bold mb-4 dark:text-white">
            Building the future of AI.
          </motion.h1>
          
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            Hover over the name to see the animation
          </p>
        </motion.div>
      </div>

      {/* Right Column with Text Animation (fallback from 3D) */}
      <div className="w-1/2 h-full absolute right-0 flex items-center justify-center">
        {/* Extra padding div for easier hover activation */}
        <div className="p-8 cursor-pointer" onMouseEnter={handleSwipe}>
          <div className="relative text-6xl font-bold">
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
              className="absolute pointer-events-none"
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
                className="absolute bg-gray-800 dark:bg-gray-300 w-1 h-4"
                style={{ top: '25%', left: '83%' }}
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
        </div>

        {/* Canvas is still rendered but with opacity 0 in case we want to debug it later */}
        <div className="absolute inset-0 opacity-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedText3D darkMode={darkMode} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>

      {/* Animated Arrow */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </motion.svg>
      </motion.div>
    </div>
  );
} 