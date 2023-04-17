// Import the decode function from the jwt-decode library
import decode from 'jwt-decode';

// Define a class called AuthService with several methods
class AuthService {
  // A method to decode the JWT token and return the decoded payload
  getProfile() {
    return decode(this.getToken());
  }

  // A method to check if the user is logged in (i.e. has a valid token that is not expired)
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // A method to check if a token is expired (by comparing the "exp" claim to the current time)
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // If the token is expired, remove it from localStorage and return true
      localStorage.removeItem('id_token');
      return true;
    }
    // Otherwise, return false
    return false;
  }

  // A method to retrieve the token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // A method to save the token to localStorage and redirect the user to the homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // A method to remove the token from localStorage and refresh the page
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

// Export an instance of the AuthService class
export default new AuthService();
