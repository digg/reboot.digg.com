import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Check } from 'lucide-react';


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
      <div className="success-text-container">
        <div className="checkmark-circle">
          <Check color="white" size={16} strokeWidth={3} />
        </div>
        <p className="success-message">You're added! We'll be in touch soon.</p>
      </div>  
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