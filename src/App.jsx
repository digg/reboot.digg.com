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
  const [shouldChangeHeadline, setShouldChangeHeadline] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(config.SIMULATE_SUCCESS);
  const [diggCount, setDiggCount] = useState(830); // Track count in App

  
  // Use this ref to track if the DiggClick handler has been called
  const diggClickedRef = useRef(false);
  
  const headlines = [
    "The front page of the internet, now with superpowers",
    "Recapturing the joy of discovery for a new age",
    "Rebooting Digg: Old vibes, new intelligence",
    "Community at the core, intelligence at the edges",
    "Where user revolts become the company roadmap",
    "Serving communities, not the stock market",
    "Early internet vibes for the future we deserve",
    "Rethinking social for a new generation",
    "Blowing into the cartridge of the internet to restart it",
    "Tenderly milking the internet for that good, good juice",
    "Back from the dead and better than ever",
    "Any app is a dating app if you try hard enough",
    "Yes, you can call Alexis and Kevin “daddy”",
    "Where the algorithm works for you",
    "We’ve already read it, it’s time to digg it",
    "No raccoons were harmed in the relaunch of digg"
  ];
  
  // Callback function to update count when it changes in DiggCounter
  const handleCountUpdate = (newCount) => {
    setDiggCount(newCount);
  };

  const handleDiggClick = () => {
    // Allow clicks even when animating
    // if (isAnimating) return;
    
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
    setShouldChangeHeadline(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupSuccess(true);
  };

  return (
    <div className="app-container">
      <Logo />
      <DiggCounter onDiggClick={handleDiggClick} onCountUpdate={handleCountUpdate}/>

      <div className="app-content">
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
            <EmailSignup
              onSignupSuccess={handleSignupSuccess}
              currentCount={diggCount}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;