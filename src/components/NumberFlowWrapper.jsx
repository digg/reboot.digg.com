import React from 'react';
import NumberFlow from '@number-flow/react';

const NumberFlowWrapper = ({ value, className, ...props }) => {
  // Default animation settings
  const defaultOptions = {
    duration: 0.5,
    delay: 0.05,
    ease: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    direction: 'up', // Use up direction for the rolling effect
    value: value,
    // Custom formatting to match requirements
    format: {
      // Only use compact notation (K) for values >= 10000
      notation: value >= 10000 ? 'compact' : 'standard',
      // Don't use grouping separator (commas)
      useGrouping: false,
      // For compact notation, show 1 decimal place
      maximumFractionDigits: value >= 10000 ? 1 : 0,
      minimumFractionDigits: value >= 10000 ? 1 : 0
    }
  };

  // Merge default options with any passed props
  const options = { ...defaultOptions, ...props };

  return (
    <NumberFlow 
      {...options}
      className={`number-flow-counter ${className || ''}`}
    />
  );
};

export default NumberFlowWrapper;