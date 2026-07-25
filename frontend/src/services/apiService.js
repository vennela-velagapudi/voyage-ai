import apiClient from '../lib/api';

/**
 * Service to handle communication with the Voyage AI backend
 */
export const ApiService = {
  // Check backend server status
  async checkHealth() {
    return apiClient.get('/health');
  },

  // Generate an AI-powered travel itinerary via Google Gemini
  async generateTripItinerary(formData) {
    const payload = {
      ...formData,
      days: parseInt(formData.days, 10) || 1,
    };
    return apiClient.post('/trips/generate', payload);
  },

  // Stub method for fetching itineraries (no actual logic implemented)
  async getItineraries() {
    return apiClient.get('/itineraries');
  },
};
