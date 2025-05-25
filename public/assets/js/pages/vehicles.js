// Vehicles page

import { renderFooter } from '../components/footer.js';
import { vehicleApi } from '../services/api.js';
import { navigateTo } from '../app.js';
import { formatCurrency } from '../utils/ui.js';

// Vehicles page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <h1 class="section-title">La nostra flotta</h1>
        <p class="section-subtitle">Esplora la nostra vasta gamma di veicoli premium disponibili per la prenotazione. Dalle auto compatte alle berline di lusso, abbiamo il veicolo perfetto per ogni occasione. </p>
        
        <div class="row mb-4">
          <div class="col-12">
            <div class="bg-white p-3 rounded shadow">
              <div class="row">
                <div class="col-12 col-md-4 mb-3 mb-md-0">
                  <label for="category-filter" class="form-label">Filtra per categoria</label>
                  <select id="category-filter" class="form-control">
                    <option value="">Tutte le categorie</option>
                    <!-- Categories will be loaded here -->
                  </select>
                </div>
                
                <div class="col-12 col-md-4 mb-3 mb-md-0">
                  <label for="sort-options" class="form-label">Sort By</label>
                  <select id="sort-options" class="form-control">
                    <option value="price-asc">Prezzo: da basso ad alto</option>
                    <option value="price-desc">Prezzo: dall'alto al basso</option>
                    <option value="name-asc">Nome: da A a Z</option>
                    <option value="name-desc">Nome: da Z a A</option>
                  </select>
                </div>
                
                <div class="col-12 col-md-4">
                  <label for="search-input" class="form-label">Cerca</label>
                  <input type="text" id="search-input" class="form-control" placeholder="Cerca veicoli...">
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row" id="vehicles-container">
          <!-- Vehicles will be loaded here -->
          <div class="col-12 text-center">
            <div class="spinner"></div>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `,
  
  init: async function() {
    try {
      // Load categories
      const categoriesResponse = await vehicleApi.getAllCategories();
      
      if (categoriesResponse && categoriesResponse.categories) {
        this.renderCategories(categoriesResponse.categories);
      }
      
      // Load vehicles
      const vehiclesResponse = await vehicleApi.getAllVehicles();
      
      if (vehiclesResponse && vehiclesResponse.vehicles) {
        this.vehicles = vehiclesResponse.vehicles;
        this.renderVehicles(this.vehicles);
      }
      
      // Initialize filters and sorting
      this.initFiltersAndSorting();
    } catch (error) {
      console.error('Errore caricamento dati:', error);
      document.getElementById('vehicles-container').innerHTML = `
        <div class="col-12 text-center">
          <p>Impossibile caricare i veicoli. Si prega di riprovare più tardi.</p>
        </div>
      `;
    }
  },
  
  renderCategories: function(categories) {
    const selectElement = document.getElementById('category-filter');
    
    if (!selectElement) return;
    
    const optionsHTML = categories.map(category => 
      `<option value="${category.id}">${category.name}</option>`
    ).join('');
    
    selectElement.innerHTML += optionsHTML;
  },
  
  renderVehicles: function(vehicles) {
    const container = document.getElementById('vehicles-container');
    
    if (!container) return;
    
    if (vehicles.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p>Nessun veicolo disponibile corrispondente ai tuoi criteri.</p>
        </div>
      `;
      return;
    }
    
    // Generate HTML for vehicles
    const vehiclesHTML = vehicles.map(vehicle => `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="vehicle-card" data-id="${vehicle.id}">
          <div class="vehicle-img-container">
            <img src="/assets/images/vehicles/${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img">
            <div class="vehicle-category">${vehicle.category_name}</div>
          </div>
          <div class="vehicle-body">
            <h3 class="vehicle-title">${vehicle.make} ${vehicle.model}</h3>
            <p class="vehicle-make">${vehicle.year} · ${vehicle.color}</p>
            <div class="vehicle-features">
              <span class="vehicle-feature"><i class="fas fa-gas-pump"></i> Benzina</span>
              <span class="vehicle-feature"><i class="fas fa-cog"></i> Auto</span>
              <span class="vehicle-feature"><i class="fas fa-snowflake"></i> A/C</span>
            </div>
          </div>
          <div class="vehicle-footer">
            <div class="vehicle-price">
              <span class="price-amount">${formatCurrency(vehicle.hourly_rate)}</span>
              <span class="price-period">per ore</span>
            </div>
            <a href="/vehicles/${vehicle.id}" class="btn btn-outline">Visualizza Dettagli</a>
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
  
  initFiltersAndSorting: function() {
    const categoryFilter = document.getElementById('category-filter');
    const sortOptions = document.getElementById('sort-options');
    const searchInput = document.getElementById('search-input');
    
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => {
        this.filterAndSortVehicles();
      });
    }
    
    if (sortOptions) {
      sortOptions.addEventListener('change', () => {
        this.filterAndSortVehicles();
      });
    }
    
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.filterAndSortVehicles();
      });
    }
  },
  
  filterAndSortVehicles: function() {
    if (!this.vehicles) return;
    
    const categoryFilter = document.getElementById('category-filter');
    const sortOptions = document.getElementById('sort-options');
    const searchInput = document.getElementById('search-input');
    
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const sortValue = sortOptions ? sortOptions.value : 'price-asc';
    const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Filter vehicles
    let filteredVehicles = [...this.vehicles];
    
    // Filter by category
    if (categoryValue) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.category_id.toString() === categoryValue
      );
    }
    
    // Filter by search term
    if (searchValue) {
      filteredVehicles = filteredVehicles.filter(vehicle => {
        const searchString = `${vehicle.make} ${vehicle.model} ${vehicle.year} ${vehicle.color} ${vehicle.category_name}`.toLowerCase();
        return searchString.includes(searchValue);
      });
    }
    
    // Sort vehicles
    switch (sortValue) {
      case 'price-asc':
        filteredVehicles.sort((a, b) => a.hourly_rate - b.hourly_rate);
        break;
      case 'price-desc':
        filteredVehicles.sort((a, b) => b.hourly_rate - a.hourly_rate);
        break;
      case 'name-asc':
        filteredVehicles.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
      case 'name-desc':
        filteredVehicles.sort((a, b) => `${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`));
        break;
    }
    
    // Render filtered and sorted vehicles
    this.renderVehicles(filteredVehicles);
  }
};