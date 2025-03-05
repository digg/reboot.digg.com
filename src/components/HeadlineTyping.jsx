import React, { useState, useEffect, useRef } from 'react';
import ReactTypingEffect from 'react-typing-effect';

const HeadlineTyping = ({ headlineIndex, headlines, onComplete }) => {
  // Track the current headline being displayed
  const [currentHeadline, setCurrentHeadline] = useState(headlines[headlineIndex]);
  // Track if we need to show static text (after typing completes)
  const [showStatic, setShowStatic] = useState(false);
  // Track the displayed text for static rendering
  const [displayedText, setDisplayedText] = useState('');
  // Track the previous headline index to detect changes
  const prevHeadlineIndexRef = useRef(headlineIndex);

  // When headline index changes, reset to typing mode
  useEffect(() => {
    if (headlineIndex !== prevHeadlineIndexRef.current) {
      setShowStatic(false);
      setCurrentHeadline(headlines[headlineIndex]);
      prevHeadlineIndexRef.current = headlineIndex;
    }
  }, [headlineIndex, headlines]);

  // Function to handle when typing is complete
  const handleTypingDone = (text) => {
    setDisplayedText(text);
    setShowStatic(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <h1 className="animated-headline">
      {showStatic ? (
        <span>{displayedText}<span className="typing-cursor">|</span></span>
      ) : (
        <ReactTypingEffect
          text={currentHeadline}
          speed={40} // Faster typing
          eraseSpeed={20} // Even faster erasing
          eraseDelay={999999} // Effectively never erase unless forced
          typingDelay={0} // No delay before typing
          displayTextRenderer={(text) => text}
          cursor="|"
          cursorClassName="typing-cursor"
          onTypingDone={(text) => handleTypingDone(currentHeadline)}
        />
      )}
    </h1>
  );
};

export default HeadlineTyping;