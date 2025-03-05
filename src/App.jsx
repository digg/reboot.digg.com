import React, { useState, useRef } from 'react';
import Logo from './components/Logo';
import DiggCounter from './components/DiggCounter';
import EmailSignup from './components/EmailSignup';
import HeadlineManager from './components/HeadlineManager';
import SuccessMessage from './components/SuccessMessage';
import config from './config';
import './styles.css';

function App() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldChangeHeadline, setShouldChangeHeadline] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(config.SIMULATE_SUCCESS);
  
  // Use this ref to track if the DiggClick handler has been called
  const diggClickedRef = useRef(false);
  
  const headlines = [
    "The front page of the internet, now with superpowers",
    "Rediscover the internet again",
    "Rebooting Digg. Old vibes, new intelligence",
    "Community at the core, intelligence at the edges",
    "Where user revolts become the company roadmap"
  ];
  
  const handleDiggClick = () => {
    // Allow clicks even when animating
    // if (isAnimating) return;
    
    setIsAnimating(true);
    // Reset the flag immediately (no debounce)
    diggClickedRef.current = false;
    
    // Signal that we want to change the headline
    setShouldChangeHeadline(true);
    
    // Calculate next headline index
    const nextIndex = (headlineIndex + 1) % headlines.length;
    console.log(`Changing headline from ${headlineIndex} to ${nextIndex}`);
    setHeadlineIndex(nextIndex);
  };
  
  const handleAnimationComplete = () => {
    // Reset animation state when complete
    setIsAnimating(false);
    setShouldChangeHeadline(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupSuccess(true);
  };

  return (
    <div className="app-container">
      <Logo />
      <DiggCounter onDiggClick={handleDiggClick} />
      
      <HeadlineManager 
        headlines={headlines}
        currentIndex={headlineIndex}
        shouldChange={shouldChangeHeadline}
        onComplete={handleAnimationComplete}
      />
      
      {isSignupSuccess ? (
        <SuccessMessage />
      ) : (
        <>
          <p className="subtitle">Sign up to get early access when invites go live.</p>
          <EmailSignup onSignupSuccess={handleSignupSuccess} />
        </>
      )}
    </div>
  );
}

export default App;