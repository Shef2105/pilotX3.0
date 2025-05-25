// Home page

import { renderFooter } from '../components/footer.js';
import { vehicleApi } from '../services/api.js';
import { navigateTo } from '../app.js';

// Home page component
export default {
  template: `
    <div class="hero">
      <div class="hero-bg" style="background-image: url('https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
      <div class="container">
        <div class="hero-content slide-in-up">
          <h1 class="hero-title">Guida su richiesta</h1>
          <p class="hero-subtitle">Sperimenta la libertà di guidare senza l'impegno della proprietà. PilotX ti dà accesso a veicoli premium ogni volta che ne hai bisogno.</p>
          <div class="hero-buttons">
            <a href="/vehicles" class="btn btn-primary btn-lg">Sfoglia i veicoli</a>
            <a href="/register" class="btn btn-white btn-lg">Unisciti Ora</a>
          </div>
        </div>
      </div>
    </div>
    
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">Come funziona</h2>
        <p class="section-subtitle">Iniziare con PilotX è facile. Basta seguire questi semplici passaggi e sarete in viaggio in poco tempo.</p>
        
        <div class="steps">
          <div class="step fade-in delay-1">
            <div class="step-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <h3 class="step-title">Registrati</h3>
            <p class="step-desc">Crea un account, verifica la tua patente e completa il tuo profilo.</p>
          </div>
          
          <div class="step fade-in delay-2">
            <div class="step-icon">
              <i class="fas fa-car"></i>
            </div>
            <h3 class="step-title">Registra un veicolo</h3>
            <p class="step-desc">Sfoglia la nostra flotta, seleziona un veicolo e prenotalo per la fascia oraria desiderata.</p>
          </div>
          
          <div class="step fade-in delay-3">
            <div class="step-icon">
              <i class="fas fa-key"></i>
            </div>
            <h3 class="step-title">Sblocca & Guida</h3>
            <p class="step-desc">Usa l'app per sbloccare il tuo veicolo e goditi la tua corsa con la copertura assicurativa completa.</p>
          </div>
          
          <div class="step fade-in delay-4">
            <div class="step-icon">
              <i class="fas fa-undo"></i>
            </div>
            <h3 class="step-title">Restituisci & Paga</h3>
            <p class="step-desc">Restituire il veicolo a un punto designato e pagare solo per il tempo utilizzato.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Veicoli in primo piano</h2>
        <p class="section-subtitle">Sfoglia la nostra selezione di veicoli premium disponibili per la prenotazione.</p>
        
        <div class="row" id="featured-vehicles">
          <!-- Featured vehicles will be loaded here -->
          <div class="col-12 text-center">
            <div class="spinner"></div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <a href="/vehicles" class="btn btn-primary">Visualizza tutti i veicoli</a>
        </div>
      </div>
    </section>
    
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">Perché scegliere PilotX</h2>
        <p class="section-subtitle">Stiamo rivoluzionando il modo in cui pensi al trasporto. Ecco perché i nostri membri amano PilotX.</p>
        
        <div class="features">
          <div class="feature fade-in delay-1">
            <div class="feature-icon">
              <i class="fas fa-wallet"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Conveniente</h3>
              <p class="feature-desc">Nessun costo di manutenzione, spese assicurative o ammortamento da preoccuparsi. Paga solo per quello che usi.</p>
            </div>
          </div>
          
          <div class="feature fade-in delay-2">
            <div class="feature-icon">
              <i class="fas fa-car-alt"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Veicoli Premium</h3>
              <p class="feature-desc">Accesso a una varietà di veicoli premium ben mantenuti senza l'elevato costo di proprietà.</p>
            </div>
          </div>
          
          <div class="feature fade-in delay-3">
            <div class="feature-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Posizioni Convenienti</h3>
              <p class="feature-desc">I nostri veicoli sono strategicamente posizionati per un facile accesso in tutta la città.</p>
            </div>
          </div>
          
          <div class="feature fade-in delay-4">
            <div class="feature-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Pienamente Assicurato</h3>
              <p class="feature-desc">Ogni viaggio include una copertura assicurativa completa per la vostra tranquillità.</p>
            </div>
          </div>
          
          <div class="feature fade-in delay-5">
            <div class="feature-icon">
              <i class="fas fa-leaf"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Eco-Friendly</h3>
              <p class="feature-desc">Il car sharing riduce il numero di veicoli sulle strade, diminuendo le emissioni e la congestione.</p>
            </div>
          </div>
          
          <div class="feature fade-in delay-6">
            <div class="feature-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Booking Flessibile</h3>
              <p class="feature-desc">Prenota per ora o giorno, con opzioni per estendere la tua prenotazione secondo le tue necessità.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section bg-primary text-white text-center">
      <div class="container">
        <h2>Pronto per metterti dietro il volante?</h2>
        <p class="mb-4">Unisciti a migliaia di membri soddisfatti che godono della libertà del car sharing.</p>
        <a href="/register" class="btn btn-lg btn-white">Registrati ora</a>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: async function() {
    try {
      // Load featured vehicles
      const response = await vehicleApi.getAllVehicles();
      
      if (response && response.vehicles) {
        const featuredVehicles = response.vehicles.slice(0, 3);
        this.renderFeaturedVehicles(featuredVehicles);
      }
    } catch (error) {
      console.error('Error loading featured vehicles:', error);
      document.getElementById('featured-vehicles').innerHTML = `
        <div class="col-12 text-center">
          <p>Failed to load vehicles. Please try again later.</p>
        </div>
      `;
    }
    
    // Add scroll animations
    this.initScrollAnimations();
  },
  
  renderFeaturedVehicles: function(vehicles) {
    const container = document.getElementById('featured-vehicles');
    
    if (!container) return;
    
    if (vehicles.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p>No vehicles available at the moment.</p>
        </div>
      `;
      return;
    }
    
    // Generate HTML for vehicles
    const vehiclesHTML = vehicles.map(vehicle => `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="vehicle-card">
          <div class="vehicle-img-container">
            <img src="/assets/images/vehicles/${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img">
            <div class="vehicle-category">${vehicle.category_name}</div>
          </div>
          <div class="vehicle-body">
            <h3 class="vehicle-title">${vehicle.make} ${vehicle.model}</h3>
            <p class="vehicle-make">${vehicle.year} · ${vehicle.color}</p>
            <div class="vehicle-features">
              <span class="vehicle-feature"><i class="fas fa-gas-pump"></i> Fuel</span>
              <span class="vehicle-feature"><i class="fas fa-cog"></i> Auto</span>
              <span class="vehicle-feature"><i class="fas fa-snowflake"></i> A/C</span>
            </div>
          </div>
          <div class="vehicle-footer">
            <div class="vehicle-price">
              <span class="price-amount">$${vehicle.hourly_rate}</span>
              <span class="price-period">per hour</span>
            </div>
            <a href="/vehicles/${vehicle.id}" class="btn btn-outline">View Details</a>
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = vehiclesHTML;
    
    // Add click event to vehicle cards
    const vehicleCards = container.querySelectorAll('.vehicle-card');
    vehicleCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        navigateTo(`/vehicles/${vehicles[index].id}`);
      });
    });
  },
  
  initScrollAnimations: function() {
    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.fade-in, .slide-in-up');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.style.opacity = 1;
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Initial check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
  }
};