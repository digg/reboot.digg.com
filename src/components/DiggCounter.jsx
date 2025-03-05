import React, { useState, useEffect, useRef } from 'react';
import NumberFlowWrapper from './NumberFlowWrapper';
import GradientBackground from './GradientBackground';
import ParticleExplosion from './ParticleExplosion';
import config from '../config';

const DiggCounter = ({ onDiggClick, onCountUpdate }) => {
  const [count, setCount] = useState(830);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowExpanding, setGlowExpanding] = useState(false);
  const [particleKey, setParticleKey] = useState(0); // Use a key to force re-render
  const [particleExploding, setParticleExploding] = useState(false);
  const isPolling = useRef(false);
  const pollTimeout = useRef(null);
  const isMobile = useRef(false);
  
  const COUNT_URL = config.URLS.COUNT_URL;
  const INCREMENT_URL = config.URLS.INCREMENT_URL;
  
  // Check if the device is mobile on component mount
  useEffect(() => {
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);
  
  useEffect(() => {
    // Fetch initial count
    fetch(COUNT_URL)
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
        startPolling();
      })
      .catch(error => {
        console.error('Error fetching initial count:', error);
      });
      
    return () => {
      if (pollTimeout.current) clearTimeout(pollTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  // Call onCountUpdate whenever count changes
  if (typeof onCountUpdate === 'function') {
    onCountUpdate(count);
  }
  }, [count, onCountUpdate]);
  
  const handleTouchStart = () => {
    // On mobile, once we set hovering to true, it stays that way
    if (isMobile.current) {
      setIsHovering(true);
    }
  };
  
  const handleMouseEnter = () => {
    // Only handle mouse enter for non-mobile
    if (!isMobile.current) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    // Only handle mouse leave for non-mobile
    if (!isMobile.current) {
      setIsHovering(false);
    }
  };
  
  const poll = () => {
    const randomInterval = (Math.random() * 4 + 1) * 1000;
    
    if (pollTimeout.current) {
      clearTimeout(pollTimeout.current);
    }
    
    pollTimeout.current = setTimeout(() => {
      fetch(COUNT_URL)
        .then(response => response.json())
        .then(data => {
          if (data.count !== count) {
            setCount(data.count);
          }
          poll();
        })
        .catch(error => {
          console.error('Error polling count:', error);
          poll();
        });
    }, randomInterval);
  };
  
  const startPolling = () => {
    if (isPolling.current) return;
    isPolling.current = true;
    poll();
  };
  
  const handleDiggClick = () => {
    if (pollTimeout.current) {
      clearTimeout(pollTimeout.current);
    }
    
    pollTimeout.current = setTimeout(poll, 3000);
    
    // Remove the animation check to allow rapid clicking
    // if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Trigger the glow expansion animation
    setGlowExpanding(true);
    const timeout = setTimeout(() => {
      setGlowExpanding(false);

      return () => clearTimeout(timeout);
    }, 2000); // Match animation duration
    
    // Trigger particle explosion
    // Increment the key to force a complete re-render of particle component
    setParticleKey(prevKey => prevKey + 1);
    setParticleExploding(true);
    
    // Reset the explosion state after a short delay to prepare for next click
    setTimeout(() => {
      setParticleExploding(false);

      return () => clearTimeout(pollTimeout.current);
    }, 100);
    
    fetch(COUNT_URL)
      .then(response => response.json())
      .then(data => {
        const serverCount = data.count;
        const currentCount = Math.max(count, serverCount);
        
        // Optimistic update
        setCount(currentCount + 1);
        
        return fetch(INCREMENT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      })
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
        
        // Call the onDiggClick prop to trigger headline change
        // Only call if the function exists
        if (typeof onDiggClick === 'function') {
          onDiggClick();
        }
        
        // Allow clicks to be processed immediately
        setIsAnimating(false);
      })
      .catch(error => {
        console.error('Error with counter operations:', error);
        setIsAnimating(false);
      });
  };

  return (
    <div 
      className="digg-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <GradientBackground hovering={isHovering} expanding={glowExpanding}>
        {/* Particle explosion with key to force re-render */}
        <ParticleExplosion key={particleKey} exploding={particleExploding} />
        
        <div 
          className={`digg-box ${isAnimating ? 'bounce' : ''}`}
          onClick={handleDiggClick}
        >
          <div className="counter">
            <NumberFlowWrapper 
              value={count}
              duration={0.5}
              delay={0.02}
              direction="up"
              ease="cubic-bezier(0.18, 0.89, 0.32, 1.28)"
            />
          </div>
          <div className="digg-button-container">
            <img src="CTA.png" alt="digg button" className="digg-button-image" />
          </div>
          {/* Add the animated border */}
          <div className="digg-border"></div>
        </div>
      </GradientBackground>
    </div>
  );
};

export default DiggCounter;