// Main application file
import { routes } from './router.js';
import { renderPage } from './utils/renderer.js';
import { initHeader } from './components/header.js';
import { initAuth } from './services/auth.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  // Initialize authentication
  await initAuth();
  
  // Initialize header
  initHeader();
  
  // Initialize router
  initRouter();
  
  // Hide loading screen
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
}

// Router functionality
function initRouter() {
  // Initial route handling
  handleRouteChange();
  
  // Listen for navigation events
  window.addEventListener('popstate', handleRouteChange);
  
  // Handle link clicks for SPA navigation
  document.body.addEventListener('click', (e) => {
    // Find closest anchor tag
    const link = e.target.closest('a');
    
    // If it's a link with href and not external
    if (link && link.href && !link.getAttribute('target') && !link.getAttribute('download')) {
      const url = new URL(link.href);
      
      // Only handle links to the same origin
      if (url.origin === window.location.origin) {
        e.preventDefault();
        navigateTo(url.pathname);
      }
    }
  });
}

// Handle route change
async function handleRouteChange() {
  const path = window.location.pathname;
  
  // Find matching route
  let matchedRoute = routes.find(route => {
    if (route.path instanceof RegExp) {
      return route.path.test(path);
    }
    return route.path === path;
  });
  
  // Default to home if no route found
  if (!matchedRoute) {
    matchedRoute = routes.find(route => route.path === '/');
  }
  
  // Check if route requires authentication
  if (matchedRoute.requiresAuth && !isAuthenticated()) {
    navigateTo('/login', { redirect: path });
    return;
  }
  
  // Render the page
  try {
    document.title = matchedRoute.title || 'PilotX - Premium Car Sharing';
    await renderPage(matchedRoute.component, matchedRoute.params);
    
    // Scroll to top
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Error rendering page:', error);
    // Render error page
    renderPage('error');
  }
}

// Navigate to a new page
export function navigateTo(path, state = {}) {
  window.history.pushState(state, '', path);
  handleRouteChange();
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Export functions for external use
window.app = {
  navigateTo,
  isAuthenticated
};