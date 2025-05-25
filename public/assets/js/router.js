// Router configuration

// Define routes
export const routes = [
  {
    path: '/',
    component: 'home',
    title: 'PilotX - Premium Car Sharing'
  },
  {
    path: '/login',
    component: 'login',
    title: 'Login - PilotX'
  },
  {
    path: '/register',
    component: 'register',
    title: 'Register - PilotX'
  },
  {
    path: '/profile',
    component: 'profile',
    requiresAuth: true,
    title: 'My Profile - PilotX'
  },
  {
    path: '/booking',
    component: 'booking',
    requiresAuth: true,
    title: 'Prenota Veicolo - PilotX'
  },
  {
    path: '/vehicles',
    component: 'vehicles',
    title: 'La nostra flotta - PilotX'
  },
  {
    path: /^\/vehicles\/(\d+)$/,
    component: 'vehicleDetails',
    params: (path) => {
      const match = path.match(/^\/vehicles\/(\d+)$/);
      return match ? { id: match[1] } : {};
    },
    title: 'Dettagli Veicolo - PilotX'
  },
  {
    path: '/pricing',
    component: 'pricing',
    title: 'Prezzi - PilotX'
  },
  {
    path: '/contact',
    component: 'contact',
    title: 'Contattaci - PilotX'
  },
  {
    path: '/terms',
    component: 'terms',
    title: 'Termini e Condizioni - PilotX'
  },
  {
    path: '/privacy',
    component: 'privacy',
    title: 'Privacy Policy - PilotX'
  },
  {
    path: '/error',
    component: 'error',
    title: 'Error - PilotX'
  }
];