import apiClient from '../lib/api';

/**
 * Service to handle communication with the Voyage AI backend
 */
export const ApiService = {
  // Check backend server status
  async checkHealth() {
    return apiClient.get('/health');
  },

  // Stub method for fetching itineraries (no actual logic implemented)
  async getItineraries() {
    return apiClient.get('/itineraries');
  },
};
