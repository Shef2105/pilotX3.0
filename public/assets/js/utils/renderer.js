// Page rendering utility

// Pages cache
const pagesCache = {};

// Render a page component
export async function renderPage(componentName, params = {}) {
  const appElement = document.getElementById('app');
  
  if (!appElement) {
    console.error('App element not found');
    return;
  }
  
  try {
    // Get page component
    const component = await getPageComponent(componentName);
    
    // Create page container
    const pageContainer = document.createElement('div');
    pageContainer.id = 'page-container';
    pageContainer.className = `page ${componentName}-page`;
    
    // Set page content
    pageContainer.innerHTML = component.template;
    
    // Clear previous page
    const existingPageContainer = document.getElementById('page-container');
    if (existingPageContainer) {
      existingPageContainer.remove();
    }
    
    // Add new page to DOM
    appElement.appendChild(pageContainer);
    
    // Initialize page
    if (component.init) {
      component.init(params);
    }
    
    // Add animation class
    requestAnimationFrame(() => {
      pageContainer.classList.add('page-active');
    });
    
  } catch (error) {
    console.error(`Error rendering page "${componentName}":`, error);
    appElement.innerHTML = `
      <div class="container text-center py-5">
        <h2>Something went wrong</h2>
        <p>We're sorry, but we couldn't load the page you requested.</p>
        <a href="/" class="btn btn-primary">Go to Home Page</a>
      </div>
    `;
  }
}

// Get page component
async function getPageComponent(componentName) {
  // Check if component is already cached
  if (pagesCache[componentName]) {
    return pagesCache[componentName];
  }
  
  // Load the component
  try {
    const module = await import(`../pages/${componentName}.js`);
    pagesCache[componentName] = module.default;
    return module.default;
  } catch (error) {
    console.error(`Failed to load component "${componentName}":`, error);
    throw new Error(`Component "${componentName}" not found`);
  }
}