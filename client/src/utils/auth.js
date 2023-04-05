import decode from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';

// Store JWT token in local storage
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get JWT token from local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove JWT token from local storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode JWT token and return user data
export const getUser = () => {
  const token = getToken();
  if (token) {
    return decode(token);
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  // Check if token is valid and not expired
  return token && decode(token).exp > Date.now() / 1000;
};
