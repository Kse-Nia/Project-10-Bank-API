// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL; // Import from .env file

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/user/login`, // User Login
  SIGNUP: `${API_BASE_URL}/user/signup`, // Register New User
  USER_PROFILE: `${API_BASE_URL}/user/profile`, // Fetch and Update User Profile
};
