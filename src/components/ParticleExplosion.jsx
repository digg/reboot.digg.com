import React, { useState, useEffect, useRef } from 'react';

const ParticleExplosion = ({ exploding }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  
  // Generate particles when exploding prop changes to true
  useEffect(() => {
    if (exploding && containerRef.current) {
      // Get the container dimensions
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      // Create new particles
      const newParticles = [];
      const particleCount = 30; // Increased number of particles
      
      for (let i = 0; i < particleCount; i++) {
        // Calculate random angle and distance
        // Ensure full 360-degree coverage by dividing the circle into sections
        const sectionAngle = (Math.PI * 2) / particleCount;
        const randomOffset = sectionAngle * 0.8 * (Math.random() - 0.5); // Add some randomness within section
        const angle = (i * sectionAngle) + randomOffset;
        
        const distance = 40 + Math.random() * 100; // Random distance from center, increased range
        
        // Calculate destination coordinates
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Random particle properties
        const size = 3 + Math.random() * 5; // Size between 3-8px
        const duration = 700 + Math.random() * 900; // Duration between 0.7-1.6s
        const delay = Math.random() * 150; // Increased random delay
        
        // Random color from the gradient
        const colors = [
          'rgba(255, 0, 212, 0.8)', // Pink
          'rgba(0, 179, 255, 0.8)', // Blue
          'rgba(0, 240, 184, 0.8)'  // Teal
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        newParticles.push({
          id: i,
          startX: centerX,
          startY: centerY,
          x,
          y,
          size,
          color,
          duration,
          delay
        });
      }
      
      setParticles(newParticles);
      
      // Auto-cleanup particles after animation completes
      const maxDuration = 1750; // Max duration + max delay
      const timer = setTimeout(() => {
        setParticles([]);
      }, maxDuration);
      
      return () => clearTimeout(timer);
    }
  }, [exploding]);
  
  return (
    <div 
      className="particle-container" 
      ref={containerRef}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 6px ${particle.color}`,
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            opacity: 1,
            '--x': particle.x,
            '--y': particle.y,
            animation: `particleFly ${particle.duration}ms forwards ${particle.delay}ms`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleExplosion;