// Vehicle Details page

import { renderFooter } from '../components/footer.js';
import { vehicleApi, bookingApi } from '../services/api.js';
import { navigateTo } from '../app.js';
import { isAuthenticated } from '../services/auth.js';
import { formatCurrency, formatDate, showToast, createModal } from '../utils/ui.js';

// Vehicle Details page component
export default {
  template: `
    <div id="vehicle-details-container">
      <!-- Vehicle details will be loaded here -->
      <div class="section bg-light">
        <div class="container text-center">
          <div class="spinner"></div>
          <p>Caricamento dettagli veicoli...</p>
        </div>
      </div>
    </div>
    
    ${renderFooter()}
  `,
  
  init: async function(params) {
    if (!params || !params.id) {
      // If no vehicle ID provided, redirect to vehicles page
      navigateTo('/vehicles');
      return;
    }
    
    try {
      // Load vehicle details
      const response = await vehicleApi.getVehicleById(params.id);
      
      if (response && response.vehicle) {
        this.renderVehicleDetails(response.vehicle);
      } else {
        this.renderNotFound();
      }
    } catch (error) {
      console.error('Errore di caricamento dei dati del veicolo:', error);
      this.renderError();
    }
  },
  
  renderVehicleDetails: function(vehicle) {
    const container = document.getElementById('vehicle-details-container');
    
    if (!container) return;
    
    const isUserAuthenticated = isAuthenticated();
    const featuresArray = vehicle.features ? vehicle.features.split(',') : [];
    
    const featuresHTML = featuresArray.map(feature => 
      `<span class="vehicle-feature"><i class="fas fa-check-circle"></i> ${feature.trim()}</span>`
    ).join('');
    
    const detailsHTML = `
      <section class="section bg-light">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-7 mb-4 mb-lg-0">
              <div class="bg-white rounded shadow p-3 h-100">
                <div class="vehicle-img-container mb-3" style="height: 350px;">
                  <img src="/assets/images/vehicles/${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="w-100 h-100" style="object-fit: cover; border-radius: var(--radius-md);">
                </div>
                
                <h2>${vehicle.make} ${vehicle.model}</h2>
                <p class="text-muted">${vehicle.year} · ${vehicle.color} · ${vehicle.category_name}</p>
                
                <div class="mt-4">
                  <h4>Descriione Veicolo</h4>
                  <p>${vehicle.description || 'Nessuna descriione trovata.'}</p>
                </div>
                
                <div class="mt-4">
                  <h4>Caratteristica</h4>
                  <div class="vehicle-features mt-3">
                    ${featuresHTML || '<p>Nessuna caratteristica specificata.</p>'}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-12 col-lg-5">
              <div class="bg-white rounded shadow p-4 mb-4">
                <h3>Pricing</h3>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span>Tariffa Oraria:</span>
                  <span class="text-primary font-weight-bold">${formatCurrency(vehicle.hourly_rate)}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span>Tariffa Giornaliera:</span>
                  <span class="text-primary font-weight-bold">${formatCurrency(vehicle.daily_rate)}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Stato:</span>
                  <span class="badge bg-${vehicle.status === 'available' ? 'success' : 'warning'} text-white p-2">${vehicle.status.toUpperCase()}</span>
                </div>
              </div>
              
              <div class="bg-white rounded shadow p-4 mb-4">
                <h3>Prenota questo veicolo</h3>
                
                ${isUserAuthenticated ? `
                  <form id="booking-form">
                    <div class="form-group">
                      <label>Seleziona date</label>
                      <div class="date-picker">
                        <div class="form-group w-100">
                          <label for="start-date">Data inizio</label>
                          <input type="datetime-local" id="start-date" name="startDate" class="form-control" required>
                        </div>
                        <div class="form-group w-100">
                          <label for="end-date">Data fine</label>
                          <input type="datetime-local" id="end-date" name="endDate" class="form-control" required>
                        </div>
                      </div>
                    </div>
                    
                    <div id="booking-summary" class="booking-summary" style="display: none;">
                      <h4>Riassunto della prenotazione</h4>
                      <div class="summary-item">
                        <span>Veicolo:</span>
                        <span>${vehicle.make} ${vehicle.model}</span>
                      </div>
                      <div class="summary-item">
                        <span>Durata:</span>
                        <span id="booking-duration">-</span>
                      </div>
                      <div class="summary-item">
                        <span>Tariffa:</span>
                        <span id="booking-rate">-</span>
                      </div>
                      <div class="summary-total">
                        <span>Totale:</span>
                        <span id="booking-total" class="amount">-</span>
                      </div>
                    </div>
                    
                    <button type="button" id="check-availability-btn" class="btn btn-outline btn-block mt-3">Controlla Disponibilità</button>
                    <button type="submit" id="book-now-btn" class="btn btn-primary btn-block mt-3" style="display: none;">Prenota Ora</button>
                  </form>
                ` : `
                  <div class="alert alert-info mt-3">
                    <p class="mb-2">Devi essere loggato per prenotare questo veicolo.</p>
                    <a href="/login" class="btn btn-primary">Login</a>
                    <span class="mx-2">or</span>
                    <a href="/register" class="btn btn-outline">Registrati</a>
                  </div>
                `}
              </div>
              
              <div class="bg-white rounded shadow p-4">
                <h3>Bisogno di aiuto?</h3>
                <p>Se avete domande su questo veicolo o il processo di prenotazione, non esitate a contattarci.</p>
                <a href="/contact" class="btn btn-outline btn-block">Contattatci</a>
              </div>
            </div>
          </div>
          
          <div class="row mt-5">
            <div class="col-12">
              <h3 class="text-center mb-4">Veicoli simili</h3>
              <div class="row" id="similar-vehicles">
                <!-- Similar vehicles will be loaded here -->
                <div class="col-12 text-center">
                  <div class="spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    
    container.innerHTML = detailsHTML;
    
    // Initialize booking form
    if (isUserAuthenticated) {
      this.initBookingForm(vehicle);
    }
    
    // Load similar vehicles
    this.loadSimilarVehicles(vehicle);
  },
  
  initBookingForm: function(vehicle) {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const checkAvailabilityBtn = document.getElementById('check-availability-btn');
    const bookNowBtn = document.getElementById('book-now-btn');
    const bookingSummary = document.getElementById('booking-summary');
    const bookingForm = document.getElementById('booking-form');
    
    if (!startDateInput || !endDateInput || !checkAvailabilityBtn || !bookNowBtn || !bookingSummary) return;
    
    // Set min date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDatetimeLocal = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    startDateInput.min = formatDatetimeLocal(today);
    endDateInput.min = formatDatetimeLocal(tomorrow);
    
    // Default values
    startDateInput.value = formatDatetimeLocal(today);
    endDateInput.value = formatDatetimeLocal(tomorrow);
    
    // Check availability button
    checkAvailabilityBtn.addEventListener('click', async () => {
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
      
      if (!startDate || !endDate) {
        showToast('Selezionare le date di inizio e di fine', 'error');
        return;
      }
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        showToast('La data di fine deve essere dopo la data di inizio', 'error');
        return;
      }
      
      // Show loading state
      checkAvailabilityBtn.disabled = true;
      checkAvailabilityBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Controllando...';
      
      try {
        const response = await vehicleApi.checkAvailability(
          vehicle.id,
          startDate,
          endDate
        );
        
        if (response.available) {
          // Update booking summary
          document.getElementById('booking-duration').textContent = this.formatDuration(start, end);
          document.getElementById('booking-rate').textContent = this.getRateLabel(start, end, vehicle);
          document.getElementById('booking-total').textContent = formatCurrency(response.totalPrice);
          
          // Show booking summary and book now button
          bookingSummary.style.display = 'block';
          bookNowBtn.style.display = 'block';
          
          // Store total price for booking
          bookNowBtn.dataset.totalPrice = response.totalPrice;
          
          showToast('Il veicolo è disponibile per le date selezionate!', 'success');
        } else {
          showToast(response.message || 'Il veicolo non è disponibile per le date selezionate', 'error');
          
          // Hide booking summary and book now button
          bookingSummary.style.display = 'none';
          bookNowBtn.style.display = 'none';
        }
      } catch (error) {
        console.error('Verifica errore disponibilità:', error);
        showToast('Impossibile verificare la disponibilità. Si prega di riprovare.', 'error');
      } finally {
        // Reset button
        checkAvailabilityBtn.disabled = false;
        checkAvailabilityBtn.textContent = 'verifica Disponibilità';
      }
    });
    
    // Book now button
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get total price from data attribute
      const totalPrice = parseFloat(bookNowBtn.dataset.totalPrice || 0);
      
      if (totalPrice <= 0) {
        showToast('Si prega di verificare prima la disponibilità', 'error');
        return;
      }
      
      // Show payment modal
      this.showPaymentModal(vehicle, startDateInput.value, endDateInput.value, totalPrice);
    });
  },
  
  formatDuration: function(start, end) {
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours} ${hours !== 1 ? 'ore' : 'ora'}`;
    } else {
      const days = Math.ceil(hours / 24);
      return `${days} ${days !== 1 ? 'giorni' : 'giorno'}`;
    }
  },
  
  getRateLabel: function(start, end, vehicle) {
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${formatCurrency(vehicle.hourly_rate)} per ora`;
    } else {
      return `${formatCurrency(vehicle.daily_rate)} per giorno`;
    }
  },
  
  showPaymentModal: function(vehicle, startDate, endDate, totalPrice) {
    const modalContent = `
      <div class="payment-form">
        <div class="form-group">
          <label for="payment-method">Metodo di pagamento</label>
          <select id="payment-method" class="form-control">
            <option value="credit_card">Carta di credito</option>
            <option value="debit_card">Bancomat</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        
        <div id="credit-card-form">
          <div class="form-group">
            <label for="card-number">Numero Carta</label>
            <input type="text" id="card-number" class="form-control" placeholder="1234 5678 9012 3456">
          </div>
          
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="expiry-date">Data di scadenza</label>
                <input type="text" id="expiry-date" class="form-control" placeholder="MM/YY">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" class="form-control" placeholder="123">
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="card-name">Proprietario Carta</label>
            <input type="text" id="card-name" class="form-control" placeholder="John Doe">
          </div>
        </div>
        
        <div class="booking-summary mt-4">
          <h4>Riassunto Pagamento</h4>
          <div class="summary-item">
            <span>Vehicle:</span>
            <span>${vehicle.make} ${vehicle.model}</span>
          </div>
          <div class="summary-item">
            <span>Ritiro:</span>
            <span>${formatDate(startDate)}</span>
          </div>
          <div class="summary-item">
            <span>Restituzione:</span>
            <span>${formatDate(endDate)}</span>
          </div>
          <div class="summary-total">
            <span>Importo Totale:</span>
            <span class="amount">${formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>
    `;
    
    createModal({
      id: 'payment-modal',
      title: 'Completa il pagamento',
      content: modalContent,
      confirmText: 'Paga e Prenota',
      cancelText: 'Annulla',
      size: 'large',
      onConfirm: () => this.processBooking(vehicle.id, startDate, endDate, totalPrice)
    });
  },
  
  processBooking: async function(vehicleId, startDate, endDate, totalAmount) {
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Show loading toast
    showToast('Elaborazione della prenotazione...', 'info');
    
    try {
      const bookingData = {
        vehicleId,
        startDate,
        endDate,
        totalAmount,
        paymentMethod
      };
      
      const response = await bookingApi.createBooking(bookingData);
      
      if (response && response.bookingId) {
        showToast('Prenotazione riuscita!', 'success');
        
        // Show success modal
        createModal({
          id: 'booking-success-modal',
          title: 'Prenotazione riuscita!',
          content: `
            <div class="text-center mb-4">
              <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
              <h3 class="mt-3">Grazie!</h3>
              <p>La tua prenotazione è stata confermata. Puoi visualizzare i dettagli della tua prenotazione nel tuo profilo.</p>
            </div>
            <div class="booking-summary">
              <div class="summary-item">
                <span>ID Prenotazione:</span>
                <span>#${response.bookingId}</span>
              </div>
              <div class="summary-item">
                <span>ID Transazione:</span>
                <span>${response.transactionId}</span>
              </div>
            </div>
          `,
          confirmText: 'Visualizza Prenotazione',
          hideCancel: true,
          onConfirm: () => navigateTo('/profile')
        });
      } else {
        showToast('Prenotazione non riuscita. Si prega di riprovare.', 'error');
      }
    } catch (error) {
      console.error('Errore di prenotazione:', error);
      showToast('Impossibile elaborare la prenotazione. Si prega di riprovare.', 'error');
    }
  },
  
  loadSimilarVehicles: async function(currentVehicle) {
    try {
      // Load vehicles from the same category
      const response = await vehicleApi.getVehiclesByCategory(currentVehicle.category_id);
      
      if (response && response.vehicles) {
        // Filter out current vehicle and limit to 3
        const similarVehicles = response.vehicles
          .filter(vehicle => vehicle.id !== currentVehicle.id)
          .slice(0, 3);
        
        this.renderSimilarVehicles(similarVehicles);
      }
    } catch (error) {
      console.error('Errore di caricamento veicoli simili:', error);
      document.getElementById('similar-vehicles').innerHTML = '';
    }
  },
  
  renderSimilarVehicles: function(vehicles) {
    const container = document.getElementById('similar-vehicles');
    
    if (!container) return;
    
    if (vehicles.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p>Nessun veicolo simile disponibile.</p>
        </div>
      `;
      return;
    }
    
    // Generate HTML for vehicles
    const vehiclesHTML = vehicles.map(vehicle => `
      <div class="col-12 col-md-4 mb-4">
        <div class="vehicle-card" data-id="${vehicle.id}">
          <div class="vehicle-img-container">
            <img src="/assets/images/vehicles/${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img">
            <div class="vehicle-category">${vehicle.category_name}</div>
          </div>
          <div class="vehicle-body">
            <h3 class="vehicle-title">${vehicle.make} ${vehicle.model}</h3>
            <p class="vehicle-make">${vehicle.year} · ${vehicle.color}</p>
          </div>
          <div class="vehicle-footer">
            <div class="vehicle-price">
              <span class="price-amount">${formatCurrency(vehicle.hourly_rate)}</span>
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
    vehicleCards.forEach(card => {
      card.addEventListener('click', () => {
        const vehicleId = card.getAttribute('data-id');
        navigateTo(`/vehicles/${vehicleId}`);
      });
    });
  },
  
  renderNotFound: function() {
    const container = document.getElementById('vehicle-details-container');
    
    if (!container) return;
    
    container.innerHTML = `
      <section class="section bg-light">
        <div class="container text-center">
          <h2>Veicolo non trovato</h2>
          <p>Il veicolo che stai cercando non esiste o è stato rimosso.</p>
          <a href="/vehicles" class="btn btn-primary mt-3">Sfoglia Veicoli</a>
        </div>
      </section>
    `;
  },
  
  renderError: function() {
    const container = document.getElementById('vehicle-details-container');
    
    if (!container) return;
    
    container.innerHTML = `
      <section class="section bg-light">
        <div class="container text-center">
          <h2>Errore di caricamento del veicolo</h2>
          <p>Si è verificato un errore durante il caricamento dei dati del veicolo. Riprovare più tardi.</p>
          <a href="/vehicles" class="btn btn-primary mt-3">Sfoglia Veicoli</a>
        </div>
      </section>
    `;
  }
};