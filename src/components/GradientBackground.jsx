import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GradientBackground = ({ children, hovering, expanding }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // This effect will track mouse position when hovering
  useEffect(() => {
    const container = containerRef.current;
    
    const handleMouseMove = (e) => {
      // Only track when hovering
      if (hovering && container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [hovering]);

  return (
    <div className="gradient-container" ref={containerRef}>
      {/* The actual content */}
      {children}
      
      {/* Gradient background */}
      <motion.div
        className={`gradient-effect ${expanding ? 'glow-expand' : ''}`}
        animate={{
          opacity: hovering ? 0.6 : 0,
          scale: expanding ? 1.5 : 1, // Apply scale directly in animation for smoother transition
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          scale: { duration: expanding ? 2 : 0, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

export default GradientBackground;