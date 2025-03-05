import React, { useState, useRef, useEffect } from 'react';
import config from '../config';

const EmailSignup = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);
  
  // Check if the device is mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice);
      // If mobile, set hovering state to true by default
      if (isMobileDevice) {
        setIsHovering(true);
      }
    };
    
    checkMobile();
    
    // Re-check on window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleSubmit = () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    
    // If simulating success, bypass the API call
    if (config.SIMULATE_API_SUCCESS) {
      setTimeout(() => {
        console.log('Simulating successful API response');
        if (onSignupSuccess) {
          onSignupSuccess();
        }
        setIsSubmitting(false);
      }, 500); // Add a small delay to simulate network request
      return;
    }
    
    const clientData = {
      email: email,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct',
    };
    
    fetch(config.URLS.SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientData })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Call the callback to notify parent component
        if (onSignupSuccess) {
          onSignupSuccess();
        }
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error signing up. Please try again.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile && !isFocused) {
      setIsHovering(false);
    }
  };
  
  return (
    <div 
      className="email-form"
      ref={formRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="email"
        className="email-input"
        placeholder="Add an email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          // On mobile, don't hide the border when focus is lost
          if (!isMobile) {
            setIsHovering(false);
          }
        }}
      />
      <div 
        className="input-border"
        style={{ opacity: (isHovering || isFocused) ? 1 : 0 }}
      />
      <button
        className="signup-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Sign up'}
      </button>
    </div>
  );
};

export default EmailSignup;