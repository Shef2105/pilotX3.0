// Profile page

import { renderFooter } from '../components/footer.js';
import { getUser, updateProfile, changePassword, logout } from '../services/auth.js';
import { bookingApi } from '../services/api.js';
import { navigateTo } from '../app.js';
import { formatDate, formatCurrency, showToast, validateForm, showValidationErrors, createModal } from '../utils/ui.js';

// Profile page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <div class="profile-header">
          <div class="profile-avatar">
            <img id="profile-image" src="/assets/images/default-profile.jpg" alt="Profile Image">
          </div>
          <div class="profile-info">
            <h2 class="profile-name" id="profile-name">Caricamento...</h2>
            <p class="profile-email" id="profile-email">Caricamento...</p>
          </div>
        </div>
        
        <div class="profile-tabs">
          <div class="profile-tab active" data-tab="profile">Mio Profilo</div>
          <div class="profile-tab" data-tab="bookings">Mie Prenotazioni</div>
          <div class="profile-tab" data-tab="password">Cambia Password</div>
        </div>
        
        <div class="profile-content" id="profile-tab-content">
          <!-- Tab content will be loaded here -->
          <div class="text-center">
            <div class="spinner"></div>
            <p>Caricamento dati profilo...</p>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: function() {
    // Load user data
    const user = getUser();
    
    if (!user) {
      // Redirect to login if not authenticated
      navigateTo('/login', { redirect: '/profile' });
      return;
    }
    
    // Update profile header
    this.updateProfileHeader(user);
    
    // Initialize tabs
    this.initTabs();
    
    // Load profile tab by default
    this.loadProfileTab();
  },
  
  updateProfileHeader: function(user) {
    const nameElement = document.getElementById('profile-name');
    const emailElement = document.getElementById('profile-email');
    const imageElement = document.getElementById('profile-image');
    
    if (nameElement) {
      nameElement.textContent = `${user.nome} ${user.cognome}`;
    }
    
    if (emailElement) {
      emailElement.textContent = user.email;
    }
    
    if (imageElement && user.profileImage) {
      imageElement.src = `/assets/images/${user.profileImage}`;
    }
  },
  
  initTabs: function() {
    const tabs = document.querySelectorAll('.profile-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Load tab content
        const tabName = tab.getAttribute('data-tab');
        switch (tabName) {
          case 'profile':
            this.loadProfileTab();
            break;
          case 'bookings':
            this.loadBookingsTab();
            break;
          case 'password':
            this.loadPasswordTab();
            break;
        }
      });
    });
  },
  
  loadProfileTab: async function() {
    const contentContainer = document.getElementById('profile-tab-content');
    
    if (!contentContainer) return;
    
    // Show loading
    contentContainer.innerHTML = `
      <div class="text-center">
        <div class="spinner"></div>
        <p>Loading profile data...</p>
      </div>
    `;
    
    try {
      // Get user data
      const user = getUser();
      
      // Render profile form
      contentContainer.innerHTML = `
        <h3 class="mb-4">Edit Profile</h3>
        
        <form id="profile-form">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" id="nome" name="nome" class="form-control" value="${user.nome || ''}" required>
                <div class="invalid-feedback"></div>
              </div>
            </div>
            
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="cognome" class="form-label">Cognome</label>
                <input type="text" id="cognome" name="cognome" class="form-control" value="${user.cognome || ''}" required>
                <div class="invalid-feedback"></div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" value="${user.email || ''}" disabled>
            <small class="text-muted">Email non può essere modificato</small>
          </div>
          
          <div class="form-group">
            <label for="telefono" class="form-label">Numero di telefono</label>
            <input type="tel" id="telefono" name="telefono" class="form-control" value="${user.telefono || ''}" placeholder="Inserisci numero di telefgonor">
            <div class="invalid-feedback"></div>
          </div>
          
          <div class="form-group">
            <label for="via" class="form-label">Via</label>
            <textarea id="via" name="via" class="form-control" rows="3" placeholder="Inserisci via">${user.via || ''}</textarea>
            <div class="invalid-feedback"></div>
          </div>
          
          <div class="form-group">
            <label for="patente" class="form-label">Driving License Number</label>
            <input type="text" id="patente" name="patente" class="form-control" value="${user.patente || ''}" placeholder="Inserisci il numero della patente">
            <div class="invalid-feedback"></div>
          </div>
          
          <button type="submit" class="btn btn-primary">Salva modifiche</button>
        </form>
      `;
      
      // Initialize profile form
      this.initProfileForm();
    } catch (error) {
      console.error('Error loading profile data:', error);
      contentContainer.innerHTML = `
        <div class="alert alert-danger">
          <p>Impossibile caricare i dati del profilo. Si prega di riprovare più tardi.</p>
        </div>
      `;
    }
  },
  
  initProfileForm: function() {
    const form = document.getElementById('profile-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        nome: form.nome.value,
        cognome: form.cognome.value,
        telefono: form.telefono.value,
        via: form.via.value,
        patente: form.patente.value
      };
      
      // Validate form
      const validation = validateForm(formData, {
        nome: { required: true },
        cognome: { required: true },
        telefono: {
          pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          message: 'Inserire un numero di telefono valido'
        }
      });
      
      if (!validation.isValid) {
        showValidationErrors(form, validation.errors);
        return;
      }
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
      
      // Submit update request
      try {
        const result = await updateProfile(formData);
        
        if (result.success) {
          showToast('Profilo aggiornato con successo!', 'success');
          
          // Update profile header
          const user = getUser();
          this.updateProfileHeader(user);
        } else {
          showToast(result.message || 'Aggiornamento del profilo non riuscito. Si prega di riprovare.', 'error');
        }
      } catch (error) {
        console.error('Update profile error:', error);
        showToast('Si è verificato un errore. Riprova più tardi.', 'error');
      } finally {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  },
  
  loadBookingsTab: async function() {
    const contentContainer = document.getElementById('profile-tab-content');
    
    if (!contentContainer) return;
    
    // Show loading
    contentContainer.innerHTML = `
      <div class="text-center">
        <div class="spinner"></div>
        <p>Caricamento delle prenotazioni...</p>
      </div>
    `;
    
    try {
      // Get user bookings
      const response = await bookingApi.getUserBookings();
      
      if (response && response.bookings) {
        this.renderBookings(response.bookings, contentContainer);
      } else {
        contentContainer.innerHTML = `
          <div class="text-center">
            <p>Nessuna prenotazione trovata.</p>
            <a href="/vehicles" class="btn btn-primary mt-3">Sfoglia Veicoli</a>
          </div>
        `;
      }
    } catch (error) {
      console.error('Errore di caricamento delle prenotazioni:', error);
      contentContainer.innerHTML = `
        <div class="alert alert-danger">
          <p>Impossibile caricare le prenotazioni. Si prega di riprovare più tardi.</p>
        </div>
      `;
    }
  },
  
  renderBookings: function(bookings, container) {
    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="text-center">
          <p>Non hai prenotazioni.</p>
          <a href="/vehicles" class="btn btn-primary mt-3">Sfoglia Veicoli</a>
        </div>
      `;
      return;
    }
    
    const bookingsHTML = bookings.map(booking => `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-3">
            <img src="/assets/images/vehicles/${booking.image}" alt="${booking.make} ${booking.model}" class="img-fluid rounded-start" style="height: 100%; object-fit: cover;">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="card-title">${booking.make} ${booking.model}</h5>
                <span class="badge bg-${this.getStatusColor(booking.status)} text-white p-2">${booking.status.toUpperCase()}</span>
              </div>
              <div class="booking-details mt-3">
                <div class="row">
                  <div class="col-6">
                    <strong>ID Prenotazione:</strong> #${booking.id}
                  </div>
                  <div class="col-6">
                    <strong>Targa:</strong> ${booking.license_plate}
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <strong>Data di inizio:</strong> ${formatDate(booking.start_date)}
                  </div>
                  <div class="col-6">
                    <strong>Data di fine:</strong> ${formatDate(booking.end_date)}
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12">
                    <strong>Importo totale:</strong> ${formatCurrency(booking.total_amount)}
                  </div>
                </div>
              </div>
              <div class="mt-3">
                ${booking.status === 'pending' || booking.status === 'confirmed' ? 
                  `<button class="btn btn-outline btn-sm cancel-booking" data-id="${booking.id}">Annulla prenotazione</button>` : 
                  ''}
                <button class="btn btn-primary btn-sm view-booking" data-id="${booking.id}">Visualizza dettagli</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <h3 class="mb-4">Le mie prenotazioni</h3>
      ${bookingsHTML}
    `;
    
    // Add event listeners to buttons
    container.querySelectorAll('.cancel-booking').forEach(button => {
      button.addEventListener('click', () => {
        const bookingId = button.getAttribute('data-id');
        this.showCancelModal(bookingId);
      });
    });
    
    container.querySelectorAll('.view-booking').forEach(button => {
      button.addEventListener('click', () => {
        const bookingId = button.getAttribute('data-id');
        this.viewBookingDetails(bookingId);
      });
    });
  },
  
  getStatusColor: function(status) {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  },
  
  showCancelModal: function(bookingId) {
    createModal({
      id: 'cancel-booking-modal',
      title: 'Annulamento Prenotazione',
      content: `
        <p>Sei sicuro di voler cancellare questa prenotazione? Questa azione non può essere annullata. </p>
        <p>Se applicabile, un rimborso sarà elaborato secondo la nostra politica di cancellazione. </p>
      `,
      confirmText: 'Sì, Annulla Prenotazione',
      cancelText: 'No, Torna Indietro',
      onConfirm: () => this.cancelBooking(bookingId)
    });
  },
  
  cancelBooking: async function(bookingId) {
    showToast('Cancellazione del trattamento...', 'info');
    
    try {
      const response = await bookingApi.cancelBooking(bookingId);
      
      if (response) {
        showToast('Prenotazione annullata con successo!', 'success');
        
        // Reload bookings tab
        this.loadBookingsTab();
      } else {
        showToast('Non è stato possibile annullare la prenotazione. Riprova.', 'error');
      }
    } catch (error) {
      console.error('Annullare errore di prenotazione:', error);
      showToast('Si è verificato un errore. Riprova più tardi.', 'error');
    }
  },
  
  viewBookingDetails: async function(bookingId) {
    showToast('Caricamento dettagli della prenotazione...', 'info');
    
    try {
      const response = await bookingApi.getBookingDetails(bookingId);
      
      if (response && response.booking) {
        const booking = response.booking;
        
        createModal({
          id: 'booking-details-modal',
          title: 'Dettagli Prenotazione',
          content: `
            <div class="booking-details">
              <div class="row">
                <div class="col-6">
                  <strong>ID Prenotazione:</strong> #${booking.id}
                </div>
                <div class="col-6">
                  <strong>Status:</strong> <span class="badge bg-${this.getStatusColor(booking.status)} text-white p-2">${booking.status.toUpperCase()}</span>
                </div>
              </div>
              
              <hr>
              
              <div class="row mt-2">
                <div class="col-12">
                  <strong>Veicolo:</strong> ${booking.make} ${booking.model}
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12">
                  <strong>Targa:</strong> ${booking.license_plate}
                </div>
              </div>
              
              <hr>
              
              <div class="row mt-2">
                <div class="col-6">
                  <strong>Data di inizio:</strong> ${formatDate(booking.start_date)}
                </div>
                <div class="col-6">
                  <strong>Data di fine:</strong> ${formatDate(booking.end_date)}
                </div>
              </div>
              
              <hr>
              
              <div class="row mt-2">
                <div class="col-6">
                  <strong>Importo totale:</strong> ${formatCurrency(booking.total_amount)}
                </div>
                <div class="col-6">
                  <strong>Metodo di pagamento:</strong> ${this.formatPaymentMethod(booking.payment_method)}
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12">
                  <strong>Payment Status:</strong> <span class="badge bg-${this.getStatusColor(booking.payment_status)} text-white p-2">${booking.payment_status.toUpperCase()}</span>
                </div>
              </div>
              
              <hr>
              
              <div class="row mt-2">
                <div class="col-12">
                  <strong>ID Transazione:</strong> ${booking.transaction_id || 'N/A'}
                </div>
              </div>
            </div>
          `,
          confirmText: 'Chiudi',
          hideCancel: true
        });
      } else {
        showToast('Impossibile caricare i dettagli della prenotazione. Si prega di riprovare.', 'error');
      }
    } catch (error) {
      console.error('Visualizza i dettagli della prenotazione errore:', error);
      showToast('Si è verificato un errore. Riprova più tardi.', 'error');
    }
  },
  
  formatPaymentMethod: function(method) {
    if (!method) return 'N/A';
    
    // Convert snake_case to title case
    return method
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  
  loadPasswordTab: function() {
    const contentContainer = document.getElementById('profile-tab-content');
    
    if (!contentContainer) return;
    
    // Render password form
    contentContainer.innerHTML = `
      <h3 class="mb-4">Change Password</h3>
      
      <form id="password-form">
        <div class="form-group">
          <label for="currentPassword" class="form-label">Password Attuale</label>
          <input type="password" id="currentPassword" name="currentPassword" class="form-control" required>
          <div class="invalid-feedback"></div>
        </div>
        
        <div class="form-group">
          <label for="newPassword" class="form-label">Nuova Password</label>
          <input type="password" id="newPassword" name="newPassword" class="form-control" required>
          <div class="invalid-feedback"></div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Conferma Nuova Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" required>
          <div class="invalid-feedback"></div>
        </div>
        
        <button type="submit" class="btn btn-primary">Aggionra Password</button>
      </form>
      
      <hr class="my-4">
      
      <h3 class="mb-4">Azioni Account</h3>
      
      <div class="d-grid gap-2">
        <button id="logout-button" class="btn btn-outline">Logout</button>
        <button id="delete-account-button" class="btn btn-danger">Cancella il mio Account</button>
      </div>
    `;
    
    // Initialize password form
    this.initPasswordForm();
    
    // Initialize account actions
    this.initAccountActions();
  },
  
  initPasswordForm: function() {
    const form = document.getElementById('password-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
        confirmPassword: form.confirmPassword.value
      };
      
      // Validate form
      const validation = validateForm(formData, {
        currentPassword: { required: true },
        newPassword: {
          required: true,
          minLength: 6,
          message: 'La nuova password deve avere almeno 6 caratteri'
        },
        confirmPassword: {
          required: true,
          match: 'newPassword',
          message: 'Password non corrispondono'
        }
      });
      
      if (!validation.isValid) {
        showValidationErrors(form, validation.errors);
        return;
      }
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Aggiornando...';
      
      // Submit update request
      try {
        const result = await changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        });
        
        if (result.success) {
          showToast('Password aggiornata con successo!', 'success');
          
          // Clear form
          form.reset();
        } else {
          showToast(result.message || 'Impossibile aggiornare la password. Si prega di riprovare.', 'error');
        }
      } catch (error) {
        console.error('Errore di modifica della password:', error);
        showToast('Si è verificato un errore. Riprova più tardi.', 'error');
      } finally {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  },
  
  initAccountActions: function() {
    const logoutButton = document.getElementById('logout-button');
    const deleteAccountButton = document.getElementById('delete-account-button');
    
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        logout();
        navigateTo('/');
      });
    }
    
    if (deleteAccountButton) {
      deleteAccountButton.addEventListener('click', () => {
        this.showDeleteAccountModal();
      });
    }
  },
  
  showDeleteAccountModal: function() {
    createModal({
      id: 'delete-account-modal',
      title: 'Delete Account',
      content: `
        <div class="alert alert-danger">
          <i class="fas fa-exclamation-triangle"></i> Attenzione: questa azione non può essere annullata.
        </div>
        <p>Sei sicuro di voler cancellare il tuo account? Tutti i tuoi dati, comprese le prenotazioni e le informazioni personali, saranno rimossi in modo permanente.</p>
        <div class="form-group mt-3">
          <label for="delete-confirmation" class="form-label">Digitare "DELETE" per confermare:</label>
          <input type="text" id="delete-confirmation" class="form-control" placeholder="DELETE">
        </div>
      `,
      confirmText: 'Cancella Account',
      cancelText: 'Annulla',
      onConfirm: () => {
        const confirmationInput = document.getElementById('delete-confirmation');
        
        if (confirmationInput && confirmationInput.value === 'DELETE') {
          showToast("La cancellazione dell'\account non è implementata in questa demo", 'info');
        } else {
          showToast('Digitare "DELETE" per confermare:', 'error');
          return false; // Prevent modal from closing
        }
      }
    });
  }
};