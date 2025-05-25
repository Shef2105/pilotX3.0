// API service

// Base URL for API requests
const API_BASE_URL = '/api';

// Generic API service
export const apiService = {
  // GET request
  async get(endpoint, params = {}) {
    return await request('GET', endpoint, params);
  },
  
  // POST request
  async post(endpoint, data = {}) {
    return await request('POST', endpoint, data);
  },
  
  // PUT request
  async put(endpoint, data = {}) {
    return await request('PUT', endpoint, data);
  },
  
  // DELETE request
  async delete(endpoint, data = {}) {
    return await request('DELETE', endpoint, data);
  }
};

// Generic request function
async function request(method, endpoint, data = {}) {
  // Build full URL
  const url = new URL(API_BASE_URL + endpoint, window.location.origin);
  
  // Set up request options
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // Add authentication token if available
  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Handle different HTTP methods
  if (method === 'GET') {
    // Add query parameters for GET requests
    Object.keys(data).forEach(key => {
      url.searchParams.append(key, data[key]);
    });
  } else {
    // Add body for other requests
    options.body = JSON.stringify(data);
  }
  
  try {
    // Make the request
    const response = await fetch(url, options);
    
    // Parse response
    const responseData = await response.json();
    
    // Handle error responses
    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }
    
    return responseData;
  } catch (error) {
    console.error(`API error (${method} ${endpoint}):`, error);
    throw error;
  }
}

// Vehicle API functions
export const vehicleApi = {
  // Get all vehicles
  async getAllVehicles() {
    return await apiService.get('/vehicles');
  },
  
  // Get vehicle by ID
  async getVehicleById(id) {
    return await apiService.get(`/vehicles/${id}`);
  },
  
  // Get vehicles by category
  async getVehiclesByCategory(categoryId) {
    return await apiService.get(`/vehicles/category/${categoryId}`);
  },
  
  // Get all categories
  async getAllCategories() {
    return await apiService.get('/vehicles/categories');
  },
  
  // Check vehicle availability
  async checkAvailability(vehicleId, startDate, endDate) {
    return await apiService.post('/vehicles/check-availability', {
      vehicleId,
      startDate,
      endDate
    });
  }
};

// Booking API functions
export const bookingApi = {
  // Create new booking
  async createBooking(bookingData) {
    return await apiService.post('/bookings', bookingData);
  },
  
  // Get booking details
  async getBookingDetails(id) {
    return await apiService.get(`/bookings/${id}`);
  },
  
  // Cancel booking
  async cancelBooking(id) {
    return await apiService.put(`/bookings/${id}/cancel`);
  },
  
  // Get user bookings
  async getUserBookings() {
    return await apiService.get('/users/bookings');
  }
};