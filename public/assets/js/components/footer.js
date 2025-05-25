// Footer component

// Create footer HTML
export function renderFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">PilotX</h3>
            <p>Sperimenta la libertà del car sharing con PilotX. Guida veicoli premium senza l'impegno della proprietà.</p>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li class="footer-link"><a href="/">Home</a></li>
              <li class="footer-link"><a href="/vehicles">La nostra flotta</a></li>
              <li class="footer-link"><a href="/pricing">Prezzi</a></li>
              <li class="footer-link"><a href="/contact">Contatti</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Legale</h3>
            <ul class="footer-links">
              <li class="footer-link"><a href="/terms">Termini & Condizioni</a></li>
              <li class="footer-link"><a href="/privacy">Privacy Policy</a></li>
              <li class="footer-link"><a href="/contact">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Contattaci</h3>
            <ul class="footer-links">
              <li class="footer-link"><i class="fas fa-map-marker-alt"></i>Via verdi 349, Roma</li>
              <li class="footer-link"><i class="fas fa-phone"></i> +39 111 222 3333</li>
              <li class="footer-link"><i class="fas fa-envelope"></i> info@pilotx.com</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} PilotX Car Sharing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `;
}