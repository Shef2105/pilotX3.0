// Authentication service

import { apiService } from './api.js';
import { showToast } from '../utils/ui.js';

// User state
let currentUser = null;

// Initialize authentication
export async function initAuth() {
  // Check if token exists
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      // Get current user
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Failed to get current user:', error);
      // Clear invalid token
      logout();
    }
  }
  
  // Update UI based on auth state
  updateAuthUI();
}

// Register new user
export async function register(userData) {
  try {
    const response = await apiService.post('/auth/register', userData);
    
    if (response.token) {
      // Save token and user data
      setAuthToken(response.token);
      setCurrentUser(response.user);
      updateAuthUI();
      
      return { success: true, user: response.user };
    }
    
    return { success: false, message: 'Registration failed' };
  } catch (error) {
    console.error('Errore di registrazione', error);
    return { 
      success: false, 
      message: error.message || 'Registrazione non riuscita. Riprova.' 
    };
  }
}

// Login user
export async function login(credentials) {
  try {
    const response = await apiService.post('/auth/login', credentials);
    
    if (response.token) {
      // Save token and user data
      setAuthToken(response.token);
      setCurrentUser(response.user);
      updateAuthUI();
      
      return { success: true, user: response.user };
    }
    
    return { success: false, message: 'Login failed' };
  } catch (error) {
    console.error('Errore di login:', error);
    return { 
      success: false, 
      message: error.message || 'Login non riuscito. Si prega di verificare le credenziali. ' 
    };
  }
}

// Logout user
export function logout() {
  // Clear token and user data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser = null;
  
  // Update UI
  updateAuthUI();
  
  // Call logout endpoint
  apiService.post('/auth/logout').catch(error => {
    console.error('Errore nel logout:', error);
  });
  
  // Show toast
  showToast('Logout riuscito', 'success');
}

// Get current user
export async function getCurrentUser() {
  try {
    const response = await apiService.get('/auth/me');
    
    if (response && response.user) {
      return response.user;
    }
    
    return null;
  } catch (error) {
    console.error('Ottenere errore utente corrente:', error);
    return null;
  }
}

// Update user profile
export async function updateProfile(profileData) {
  try {
    const response = await apiService.put('/users/profile', profileData);
    
    if (response) {
      // Update current user data
      const updatedUser = await getCurrentUser();
      if (updatedUser) {
        setCurrentUser(updatedUser);
        updateAuthUI();
      }
      
      return { success: true, message: 'Profilo aggiornato con successo' };
    }
    
    return { success: false, message: 'Aggiornamento del profilo non riuscito' };
  } catch (error) {
    console.error('Aggiornamento profilo errore:', error);
    return { 
      success: false, 
      message: error.message || 'Impossibile aggiornare il profilo. Si prega di riprovare.' 
    };
  }
}

// Change password
export async function changePassword(passwordData) {
  try {
    const response = await apiService.put('/users/change-password', passwordData);
    
    if (response) {
      return { success: true, message: 'Password modificata con successo' };
    }
    
    return { success: false, message: 'Impossibile cambiare la password' };
  } catch (error) {
    console.error('Errore di modifica della password:', error);
    return { 
      success: false, 
      message: error.message || 'Impossibile cambiare la password. Si prega di riprovare.' 
    };
  }
}

// Set authentication token
function setAuthToken(token) {
  localStorage.setItem('token', token);
}

// Set current user
function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem('user', JSON.stringify(user));
}

// Get current user from state
export function getUser() {
  if (currentUser) {
    return currentUser;
  }
  
  // Try to get from localStorage
  const userJson = localStorage.getItem('user');
  if (userJson) {
    try {
      currentUser = JSON.parse(userJson);
      return currentUser;
    } catch (error) {
      console.error('Impossibile analizzare i dati utente:', error);
    }
  }
  
  return null;
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Update UI based on authentication state
function updateAuthUI() {
  const authLinks = document.querySelectorAll('.auth-link');
  const userMenus = document.querySelectorAll('.user-menu');
  
  if (isAuthenticated()) {
    // User is logged in
    authLinks.forEach(link => link.style.display = 'none');
    userMenus.forEach(menu => menu.style.display = 'block');
    
    // Update user name
    const user = getUser();
    if (user) {
      const userNameElements = document.querySelectorAll('.user-name');
      userNameElements.forEach(el => {
        el.textContent = `${user.firstName} ${user.lastName}`;
      });
    }
  } else {
    // User is logged out
    authLinks.forEach(link => link.style.display = 'block');
    userMenus.forEach(menu => menu.style.display = 'none');
  }
}