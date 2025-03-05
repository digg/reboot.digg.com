import React, { useState, useEffect, useRef } from 'react';
import NumberFlowWrapper from './NumberFlowWrapper';
import GradientBackground from './GradientBackground';
import config from '../config';

const DiggCounter = ({ onDiggClick }) => {
  const [count, setCount] = useState(830);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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
      if (pollTimeout.current) {
        clearTimeout(pollTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [useAlternative, setUseAlternative] = useState(false);

  useEffect(() => {
    // Try the primary implementation first, but fallback to the alternative if it fails
    try {
      const test = <NumberFlowWrapper value={1} />;
    } catch (error) {
      console.log('Falling back to alternative NumberFlow implementation');
      setUseAlternative(true);
    }
  }, []);
  
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
    
    if (isAnimating) return;
    
    setIsAnimating(true);
    
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
        // Only call once and only if the function exists
        if (typeof onDiggClick === 'function') {
          onDiggClick();
        }
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
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
      <GradientBackground hovering={isHovering}>
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