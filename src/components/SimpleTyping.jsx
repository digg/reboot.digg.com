import React, { useState, useEffect, useRef } from 'react';

const SimpleTyping = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const typingIndexRef = useRef(0);
  const timeoutRef = useRef(null);
  
  // Handle clean up of timeouts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Main typing effect
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // If we haven't typed the full text yet
    if (typingIndexRef.current < text.length) {
      // Random delay for more natural typing
      const delay = Math.floor(Math.random() * 40) + 30; // 30-70ms
      
      timeoutRef.current = setTimeout(() => {
        // Add the next character
        setDisplayText(text.substring(0, typingIndexRef.current + 1));
        typingIndexRef.current++;
      }, delay);
    } else if (typingIndexRef.current === text.length) {
      // We've completed typing
      if (onComplete) {
        onComplete();
      }
    }
  }, [text, displayText, onComplete]);
  
  // Reset typing when text changes
  useEffect(() => {
    // Reset the typing index and display text when the text prop changes
    typingIndexRef.current = 0;
    setDisplayText('');
  }, [text]);
  
  return (
    <div className="simple-typing">
      <span className="typing-text">{displayText}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

export default SimpleTyping;