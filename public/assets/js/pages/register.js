// Register page

import { renderFooter } from '../components/footer.js';
import { register } from '../services/auth.js';
import { navigateTo } from '../app.js';
import { showToast, validateForm, showValidationErrors } from '../utils/ui.js';

// Register page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <div class="auth-form">
          <h2 class="auth-title">Crea un Account</h2>
          
          <form id="register-form">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="firstName" class="form-label">Nome</label>
                  <input type="text" id="firstName" name="firstName" class="form-control" placeholder="Inserisci nome" required>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="lastName" class="form-label">Cognome</label>
                  <input type="text" id="lastName" name="lastName" class="form-control" placeholder="Inserisci cognome" required>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-control" placeholder="Inserisci email" required>
              <div class="invalid-feedback"></div>
            </div>
            
            <div class="form-group">
              <label for="phone" class="form-label">Numero di telefono</label>
              <input type="tel" id="phone" name="phone" class="form-control" placeholder="Inserisci numero di telefono">
              <div class="invalid-feedback"></div>
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" class="form-control" placeholder=Inserisci password" required>
              <div class="invalid-feedback"></div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword" class="form-label">Conferma Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Conferma password" required>
              <div class="invalid-feedback"></div>
            </div>
            
            <div class="form-group">
              <div class="form-check">
                <input type="checkbox" id="termsAndConditions" name="termsAndConditions" class="form-check" required>
                <label for="termsAndConditions" class="form-check-label">
                  Accetto i <a href="/terms" target="_blank">Termini e condizioni</a> e l'<a href="/privacy" target="_blank">Informativa sulla privacy</a>
                </label>
                <div class="invalid-feedback"></div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block">Crea Account</button>
          </form>
          
          <div class="auth-links">
            <p>Hai già un account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: function() {
    // Get form element
    const form = document.getElementById('register-form');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          phone: form.phone.value,
          password: form.password.value,
          confirmPassword: form.confirmPassword.value,
          termsAndConditions: form.termsAndConditions.checked
        };
        
        // Validate form
        const validation = validateForm(formData, {
          firstName: { required: true },
          lastName: { required: true },
          email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Inserisci un indirizzo email valido'
          },
          phone: {
            pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            message: 'Inserisci un numero di telefono valido'
          },
          password: {
            required: true,
            minLength: 6,
            message: 'Password deve essere di almeno 6 caratteri'
          },
          confirmPassword: {
            required: true,
            match: 'password',
            message: 'Password non corrispondono'
          },
          termsAndConditions: {
            required: 'Devono essere accettati i termini e le condizioni'
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
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Caricamento...';
        
        // Submit registration request
        try {
          // Remove unnecessary fields before sending
          delete formData.confirmPassword;
          delete formData.termsAndConditions;
          
          const result = await register(formData);
          
          if (result.success) {
            showToast('Registrazione riuscita!', 'success');
            navigateTo('/profile');
          } else {
            showToast(result.message || 'Registrazione non riuscita. Riprova.', 'error');
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        } catch (error) {
          console.error('Errore di registraizone:', error);
          showToast('Si è verificato un errore. Riprova più tardi.', 'error');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      });
    }
  }
};