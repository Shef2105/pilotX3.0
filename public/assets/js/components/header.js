// Header component

// Initialize header
export function initHeader() {
  renderHeader();
  initHeaderBehavior();
}

// Render header HTML
function renderHeader() {
  const headerHTML = `
    <header id="main-header">
      <div class="container">
        <nav class="navbar">
          <a href="/" class="logo">
            <img src="/assets/images/logo.png" alt="PilotX">
            PilotX
          </a>
          
          <button class="hamburger" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul class="nav-menu">
            <li class="nav-item">
              <a href="/" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="/vehicles" class="nav-link">La nostra flotta</a>
            </li>
            <li class="nav-item">
              <a href="/pricing" class="nav-link">Prezzi</a>
            </li>
            <li class="nav-item">
              <a href="/contact" class="nav-link">Contatti</a>
            </li>
            <li class="nav-item auth-link">
              <a href="/login" class="btn btn-outline">Login</a>
            </li>
            <li class="nav-item auth-link">
              <a href="/register" class="btn btn-primary">Registrati</a>
            </li>
            <li class="nav-item user-menu" style="display: none;">
              <a href="/profile" class="nav-link">
                <i class="fas fa-user-circle"></i>
                <span class="user-name">User</span>
              </a>
            </li>
            <li class="nav-item user-menu" style="display: none;">
              <a href="#" class="nav-link logout-link">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;
  
  // Add header to DOM
  const existingHeader = document.getElementById('main-header');
  if (existingHeader) {
    existingHeader.outerHTML = headerHTML;
  } else {
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.insertAdjacentHTML('afterbegin', headerHTML);
    }
  }
  
  // Initialize logout functionality
  const logoutLink = document.querySelector('.logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Import auth service and logout
      import('../services/auth.js').then(module => {
        module.logout();
        window.location.href = '/';
      });
    });
  }
}

// Initialize header behavior
function initHeaderBehavior() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Transparent header on home page
  const header = document.getElementById('main-header');
  if (header) {
    // Check if current page is home
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      header.classList.add('transparent');
      
      // Change header on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
      
      // Initial check
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      }
    }
  }
  
  // Highlight active page in navigation
  updateActiveNavLink();
}

// Update active navigation link
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Skip auth links and user menu
    if (link.closest('.auth-link') || link.closest('.user-menu')) {
      return;
    }
    
    const linkPath = new URL(link.href).pathname;
    
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
    // Special case for home page
    else if (currentPath === '/' && linkPath === '/') {
      link.classList.add('active');
    }
  });
}