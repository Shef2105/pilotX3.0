// Error page

import { renderFooter } from '../components/footer.js';

// Error page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container text-center">
        <h1 class="section-title">Oops! Qualcosa è andato storot</h1>
        <p class="section-subtitle mb-4">Non siamo riusciti a trovare la pagina che cercavi. Potrebbe essere stata spostata, cancellata o mai esistita.</p>
        
        <div class="text-center mb-5">
          <img src="https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Error" style="max-width: 400px; max-height: 300px; object-fit: cover; border-radius: var(--radius-lg);">
        </div>
        
        <div class="buttons">
          <a href="/" class="btn btn-primary">Vai alla Home Page</a>
          <a href="/vehicles" class="btn btn-outline ml-3">Sfoglia i veicoli</a>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `
};