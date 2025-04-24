// API Configuration
const API_CONFIG = {
  // Development environment (local)
  development: {
    baseUrl: 'http://localhost:5000'
  },
  // Production environment (Render)
  production: {
    baseUrl: 'https://hivesite-api.onrender.com' // Replace with your actual Render URL
  }
};

// Choose environment based on current URL
const isProduction = 
  window.location.hostname !== 'localhost' && 
  !window.location.hostname.includes('127.0.0.1');

const environment = isProduction ? 'production' : 'development';
const config = API_CONFIG[environment];

// Export the base URL for direct API calls
export const API_URL = config.baseUrl;

// Utility function to get full API URL
export const getApiUrl = (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${config.baseUrl}${path}`;
};

export default config; 