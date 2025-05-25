// Contact page

import { renderFooter } from '../components/footer.js';
import { showToast, validateForm, showValidationErrors } from '../utils/ui.js';

// Contact page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <h1 class="section-title">Contattaci</h1>
        <p class="section-subtitle">Hai domande o feedback? Siamo qui per aiutarti! Contatta il nostro team utilizzando uno dei metodi riportati di seguito.</p>
        
        <div class="contact-info">
          <div class="contact-item fade-in delay-1">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="contact-content">
              <h3 class="contact-title">La nostra posizione</h3>
              <p class="contact-text">Via verdi 349, Roma</p>
            </div>
          </div>
          
          <div class="contact-item fade-in delay-2">
            <div class="contact-icon">
              <i class="fas fa-phone"></i>
            </div>
            <div class="contact-content">
              <h3 class="contact-title">Numero di telefono</h3>
              <p class="contact-text">+39 111 222 3333</p>
            </div>
          </div>
          
          <div class="contact-item fade-in delay-3">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-content">
              <h3 class="contact-title">Email Address</h3>
              <p class="contact-text">info@pilotx.com</p>
            </div>
          </div>
          
          <div class="contact-item fade-in delay-4">
            <div class="contact-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="contact-content">
              <h3 class="contact-title">Orari di lavoro</h3>
              <p class="contact-text">Lun-Ven: 9:00 AM - 7:00 PM<br>Sab-Dom: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-12 col-lg-6 mb-4 mb-lg-0">
            <div class="contact-map">
              <!-- Placeholder for map -->
              <img src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Map" class="w-100 h-100" style="object-fit: cover;">
            </div>
          </div>
          
          <div class="col-12 col-lg-6">
            <div class="bg-white rounded shadow p-4">
              <h3 class="mb-4">Mandaci un messaggio</h3>
              
              <form id="contact-form">
                <div class="form-group">
                  <label for="name" class="form-label">Tuo nome</label>
                  <input type="text" id="name" name="name" class="form-control" placeholder="Inserisci il tuo nome" required>
                  <div class="invalid-feedback"></div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" id="email" name="email" class="form-control" placeholder="Inserisci la tua email" required>
                  <div class="invalid-feedback"></div>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Oggetto</label>
                  <input type="text" id="subject" name="subject" class="form-control" placeholder="Inserisci oggettot" required>
                  <div class="invalid-feedback"></div>
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Messaggio</label>
                  <textarea id="message" name="message" class="form-control" rows="5" placeholder="Inserisci messaggio" required></textarea>
                  <div class="invalid-feedback"></div>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Invia Messagio</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">Domande Frequenti</h2>
        <p class="section-subtitle">Trova le risposte alle domande più frequenti sul nostro servizio di car sharing.</p>
        
        <div class="row">
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Come posso iscrivermi a PilotX?</h3>
                <p class="card-text">Iscriversi è facile! Basta fare clic sul pulsante "Iscriviti" sul nostro sito web, compilare i dati, verificare la tua e-mail e caricare la patente. Una volta approvato, puoi iniziare immediatamente a prenotare i veicoli.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Come faccio a sbloccare il veicolo?</h3>
                <p class="card-text">Una volta confermata la tua prenotazione, puoi utilizzare la nostra app mobile per sbloccare il veicolo all'orario programmato. Basta avvicinarsi al veicolo, aprire l'app e toccare "Sblocca" per iniziare il viaggio.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Cosa succede se ho bisogno di prolungare la mia prenotazione?</h3>
                <p class="card-text">È possibile estendere la prenotazione tramite l'app o il sito web, a condizione che il veicolo non sia prenotato da qualcun altro immediatamente dopo la prenotazione. Le tariffe di estensione sono calcolate allo stesso tasso della prenotazione originale.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">Cosa succede se ho un incidente?</h3>
                <p class="card-text">In caso di incidente, garantire innanzitutto la sicurezza di tutti, quindi contattare i servizi di emergenza se necessario. Segnala immediatamente l'incidente tramite la nostra app e il nostro team del servizio clienti ti guiderà attraverso i prossimi passaggi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: function() {
    // Initialize contact form
    const form = document.getElementById('contact-form');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value
        };
        
        // Validate form
        const validation = validateForm(formData, {
          name: { required: true },
          email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Inserrire un indirizzo email valido'
          },
          subject: { required: true },
          message: {
            required: true,
            minLength: 10,
            message: 'Il messaggio deve contenere almeno 10 caratteri'
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
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inviando...';
        
        // Simulate API call
        setTimeout(() => {
          // Reset form
          form.reset();
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          
          // Show success message
          showToast('Messaggio inviato con success vi\ richiameremo presto.', 'successo');
        }, 1500);
      });
    }
    
    // Initialize animations
    this.initScrollAnimations();
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