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

  // Google Places interactive location search by text and destination context
  async searchPlace({ query, destination }) {
    return apiClient.get('/places/search', {
      params: { query, destination },
    });
  },

  // Fetch complete details for a place ID from Google Places API
  async getPlaceDetails(placeId) {
    return apiClient.get(`/places/details/${encodeURIComponent(placeId)}`);
  },

  // Search nearby restaurants or tourist attractions around GPS coordinates
  async searchNearby({ lat, lng, category }) {
    return apiClient.get('/places/nearby', {
      params: { lat, lng, category },
    });
  },
};
