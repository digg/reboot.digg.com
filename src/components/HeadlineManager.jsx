import React, { useState, useEffect, useRef } from 'react';
import SimpleTyping from './SimpleTyping';

const HeadlineManager = ({ headlines, currentIndex, shouldChange, onComplete }) => {
  // Keep track of the current text being displayed
  const [currentText, setCurrentText] = useState(headlines[0]);
  // Key to force component remount
  const [key, setKey] = useState(0);
  // Track if we're in the process of changing headlines
  const isChangingRef = useRef(false);
  
  // Handle headline change
  useEffect(() => {
    if (shouldChange && !isChangingRef.current) {
      isChangingRef.current = true;
      // Force a remount of the SimpleTyping component
      setKey(prevKey => prevKey + 1);
      // Update text to the new headline
      setCurrentText(headlines[currentIndex]);
    } else if (!shouldChange) {
      isChangingRef.current = false;
    }
  }, [shouldChange, currentIndex, headlines]);
  
  // When typing is complete, notify parent
  const handleTypingComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <h1 className="animated-headline">
      <SimpleTyping 
        key={key}
        text={currentText}
        onComplete={handleTypingComplete}
      />
    </h1>
  );
};

export default HeadlineManager;