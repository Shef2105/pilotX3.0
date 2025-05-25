// Pricing page

import { renderFooter } from '../components/footer.js';
import { navigateTo } from '../app.js';
import { vehicleApi } from '../services/api.js';
import { formatCurrency } from '../utils/ui.js';

// Pricing page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <h1 class="section-title">Prezzi</h1>
        <p class="section-subtitle">Scegli il piano che si adatta alle tue esigenze. Offriamo opzioni di prezzo flessibili se hai bisogno di un veicolo per un'ora o per più giorni.</p>
        
        <div class="pricing-cards">
          <div class="pricing-card fade-in delay-1">
            <div class="pricing-header">
              <h3 class="pricing-title">Orario</h3>
              <p class="pricing-subtitle">Perfetto per viaggi veloci</p>
              <div class="pricing-price">$10<span class="pricing-period">/hour</span></div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> Paga solo per il tempo che usi</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Auto economiche a partire da $10/ora</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Disponibilità di veicoli di lusso</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Benzina inclusa</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Cancellazione gratuita 24 ore prima</li>
            </ul>
            <div class="pricing-footer">
              <a href="/vehicles" class="btn btn-outline btn-block">Sfogla Veicolis</a>
            </div>
          </div>
          
          <div class="pricing-card featured fade-in delay-2">
            <div class="pricing-header featured">
              <h3 class="pricing-title">Giornaliero</h3>
              <p class="pricing-subtitle">Scelta più popolare</p>
              <div class="pricing-price">$49<span class="pricing-period">/day</span></div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> Periodi di prenotazione 24 ore su 24</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Auto economiche a partire da $49/giorno</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Fino a 200 miglia incluse</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Copertura assicurativa completa</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Cancellazione gratuita 24 ore prima</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> assistenza stradale 24/7</li>
            </ul>
            <div class="pricing-footer">
              <a href="/vehicles" class="btn btn-primary btn-block">Sfoglia Veicoli</a>
            </div>
          </div>
          
          <div class="pricing-card fade-in delay-3">
            <div class="pricing-header">
              <h3 class="pricing-title">Settimanali</h3>
              <p class="pricing-subtitle">Best for longer trips</p>
              <div class="pricing-price">$249<span class="pricing-period">/week</span></div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> 7 giorni di prenotazione</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Auto economiche a partire da $ 249/ settimana</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Fino a 1000 miglia incluse</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Copertura assicurativa completa</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> Una pulizia gratuita inclusa</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> assistenza stradale 24/7</li>
            </ul>
            <div class="pricing-footer">
              <a href="/vehicles" class="btn btn-outline btn-block">Sfoglia Veicoli</a>
            </div>
          </div>
        </div>
        
        <div class="section-subtitle mt-5">
          <p class="text-center">Tutti i piani includono assicurazione, manutenzione e assistenza stradale. Il carburante è incluso per le prenotazioni orarie.</p>
        </div>
      </div>
    </section>
    
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">Categorie di veicoli</h2>
        <p class="section-subtitle">La nostra flotta è suddivisa in diverse categorie per soddisfare esigenze e budget diversi. Sfoglia la nostra selezione per trovare il veicolo perfetto per il tuo viaggio.</p>
        
        <div class="row" id="vehicle-categories">
          <!-- Vehicle categories will be loaded here -->
          <div class="col-12 text-center">
            <div class="spinner"></div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Domande frequenti</h2>
        <p class="section-subtitle">Hai domande sui nostri prezzi? Trova le risposte alle domande più comuni qui sotto.</p>
        
        <div class="row">
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Come funziona il pricing?</h3>
                <p class="card-text">I nostri prezzi sono semplici e trasparenti. Paghi per il tempo in cui utilizzi il veicolo, con tariffe diverse per prenotazioni orarie, giornaliere e settimanali. Diverse classi di veicoli hanno tariffe diverse, che sono chiaramente visualizzati sulla pagina di ogni veicolo.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Cosa è incluso nel prezzo?</h3>
                <p class="card-text">Tutti i nostri prezzi includono assicurazione, manutenzione e assistenza stradale. Per le prenotazioni orarie, il carburante è incluso. Per le prenotazioni giornaliere e settimanali, dovrai restituire il veicolo con la stessa quantità di carburante che avevi al momento del ritiro.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Are there any additional costs?</h3>
                <p class="card-text">Additional costs may include late returns ($10/hour), excessive cleaning ($50), or mileage overages for daily and weekly bookings ($0.25/mile). All potential additional costs are clearly outlined in our terms and conditions.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Qual è la vostra politica di cancellazione?</h3>
                <p class="card-text">Le prenotazioni possono essere cancellate gratuitamente fino a 24 ore prima dell'orario di inizio. Cancellazioni meno di 24 ore in anticipo sono soggetti a una tassa del 50% del totale della prenotazione. No-show sono addebitati 100% del totale della prenotazione.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section bg-primary text-white text-center">
      <div class="container">
        <h2>Pronto a partire?</h2>
        <p class="mb-4">Sfoglia la nostra flotta e trova il veicolo perfetto per le tue esigenze.</p>
        <a href="/vehicles" class="btn btn-lg btn-white">Sfoglia Veicoli</a>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: async function() {
    try {
      // Load vehicle categories
      const response = await vehicleApi.getAllCategories();
      
      if (response && response.categories) {
        this.renderVehicleCategories(response.categories);
      }
    } catch (error) {
      console.error('Error loading vehicle categories:', error);
      document.getElementById('vehicle-categories').innerHTML = `
        <div class="col-12 text-center">
          <p>Caricamento delle categorie di veicoli non riuscito. Riprova più tardi.</p>
        </div>
      `;
    }
    
    // Initialize animations
    this.initScrollAnimations();
  },
  
  renderVehicleCategories: async function(categories) {
    const container = document.getElementById('vehicle-categories');
    
    if (!container) return;
    
    if (categories.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p>Nessuna categoria di veicoli disponibile.</p>
        </div>
      `;
      return;
    }
    
    // Get sample vehicle for each category
    const categoriesWithSample = await Promise.all(categories.map(async (category) => {
      try {
        const response = await vehicleApi.getVehiclesByCategory(category.id);
        const sampleVehicle = response.vehicles && response.vehicles.length > 0 ? response.vehicles[0] : null;
        return { ...category, sampleVehicle };
      } catch (error) {
        console.error(`Errore di caricamento del veicolo campione per la categoria ${category.id}:`, error);
        return { ...category, sampleVehicle: null };
      }
    }));
    
    // Generate HTML for categories
    const categoriesHTML = categoriesWithSample.map((category, index) => `
      <div class="col-12 col-md-6 col-lg-3 mb-4">
        <div class="card h-100 fade-in delay-${index + 1}">
          <div class="card-img-container" style="height: 200px; overflow: hidden;">
            <img src="/assets/images/vehicles/${category.sampleVehicle ? category.sampleVehicle.image : 'default-car.jpg'}" class="card-img-top" alt="${category.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="card-body">
            <h3 class="card-title">${category.name}</h3>
            <p class="card-text">${category.description || 'Nessuna descrizione disponibile.'}</p>
            ${category.sampleVehicle ? `
              <div class="card-price mt-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span>A partire da:</span>
                  <span class="text-primary font-weight-bold">${formatCurrency(category.sampleVehicle.hourly_rate)}/hour</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-1">
                  <span>Tasso giornaliero:</span>
                  <span class="text-primary font-weight-bold">${formatCurrency(category.sampleVehicle.daily_rate)}/day</span>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="card-footer">
            <a href="/vehicles" class="btn btn-outline btn-block" data-category-id="${category.id}">Visualizza Veicoli</a>
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = categoriesHTML;
    
    // Add click event for category buttons
    container.querySelectorAll('[data-category-id]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = button.getAttribute('data-category-id');
        // Pass category ID to vehicles page
        navigateTo(`/vehicles?category=${categoryId}`);
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