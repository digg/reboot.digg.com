// Configuration file for the Digg application
// Edit these settings for different application behaviors

const config = {
  // Set to true to show success message immediately without making API calls
  SIMULATE_SUCCESS: false,
  
  // Set to true to bypass API call in email signup component but still require button click
  SIMULATE_API_SUCCESS: true,
  
  // API endpoints
  URLS: {
    COUNT_URL: 'https://w473mpjyh6.execute-api.us-east-2.amazonaws.com/prod/count',
    INCREMENT_URL: 'https://w473mpjyh6.execute-api.us-east-2.amazonaws.com/prod/digg',
    SUBSCRIBE_URL: 'https://2t2rkg32gc.execute-api.us-east-2.amazonaws.com/prod/subscribe'
  },
  
  // Animation speeds
  ANIMATION: {
    TYPING_SPEED: 40, // ms between characters when typing
    ERASING_SPEED: 20, // ms between characters when erasing
  }
};

export default config;
