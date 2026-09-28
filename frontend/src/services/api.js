import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? '' : 'http://localhost:8000'),
  timeout: 30000,
});

/**
 * Upload a rice leaf image with GPS coordinates to diagnose disease
 * and receive tailored treatment recommendations.
 * @param {File} imageFile
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const predictDisease = async (imageFile, lat = 25.3176, lon = 82.9739) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('latitude', lat);
  formData.append('longitude', lon);

  const response = await api.post('/api/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Get micro-meteorological weather conditions for given coordinates.
 * @param {number} lat
 * @param {number} lon
 */
export const getWeather = async (lat = 25.3176, lon = 82.9739) => {
  const response = await api.get('/api/weather', {
    params: { lat, lon },
  });
  return response.data;
};

/**
 * Fetch last N prediction records from MongoDB.
 * @param {number} limit
 */
export const getHistory = async (limit = 20) => {
  const response = await api.get('/api/history', {
    params: { limit },
  });
  return response.data;
};

/**
 * Delete a historical diagnosis log by record ID.
 * @param {string} recordId
 */
export const deleteHistory = async (recordId) => {
  const response = await api.delete(`/api/history/${recordId}`);
  return response.data;
};

/**
 * Backend health check helper.
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
