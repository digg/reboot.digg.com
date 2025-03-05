import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const SuccessMessage = () => {
  const [lottieData, setLottieData] = useState(null);
  
  // Load the Lottie animation data
  useEffect(() => {
    const loadLottieData = async () => {
      try {
        // Fetch the Lottie animation file
        fetch('/diggler_01.json')
          .then(response => response.json())
          .then(data => {
            setLottieData(data);
          })
          .catch(err => {
            console.error("Error loading Lottie animation:", err);
          });
      } catch (error) {
        console.error("Error setting up Lottie animation:", error);
      }
    };
    
    loadLottieData();
  }, []);
  
  return (
    <div className="success-message-container">
      <p className="success-message">Thank you for signing up! We will be in touch soon.</p>
      
      {lottieData && (
        <div className="lottie-container">
          <Lottie 
            animationData={lottieData}
            loop={true}
            autoplay={true}
          />
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;