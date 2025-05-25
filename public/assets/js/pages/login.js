// Login page

import { renderFooter } from '../components/footer.js';
import { login } from '../services/auth.js';
import { navigateTo } from '../app.js';
import { showToast, validateForm, showValidationErrors } from '../utils/ui.js';

// Login page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <div class="auth-form">
          <h2 class="auth-title">Login to PilotX</h2>
          
          <form id="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-control" placeholder="Inserisci email" required>
              <div class="invalid-feedback"></div>
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" class="form-control" placeholder="Inserisci  password" required>
              <div class="invalid-feedback"></div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </form>
          
          <div class="auth-links">
            <p>Non hai un account? <a href="/register">Registrati</a></p>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: function(params) {
    // Get form element
    const form = document.getElementById('login-form');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
          email: form.email.value,
          password: form.password.value
        };
        
        // Validate form
        const validation = validateForm(formData, {
          email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
          },
          password: {
            required: true,
            minLength: 6,
            message: 'Password must be at least 6 characters'
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
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Submit login request
        try {
          const result = await login(formData);
          
          if (result.success) {
            showToast('Login riuscito!', 'success');
            
            // Redirect to dashboard or requested page
            if (params && params.redirect) {
              navigateTo(params.redirect);
            } else {
              navigateTo('/');
            }
          } else {
            showToast(result.message || 'Login non riuscito. Si prega di riprovare.', 'error');
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        } catch (error) {
          console.error('Login error:', error);
          showToast('Si è verificato un errore. Riprova più tardi.', 'error');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      });
    }
  }
};