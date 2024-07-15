const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.MAPS_API_KEY;
const GOOGLE_MAPS_GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const geocodeAddress = async (address) => {
  try {
    console.log(`Geocoding address: ${address}`);
    const response = await axios.get(GOOGLE_MAPS_GEOCODING_URL, {
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    console.log('Google Maps API response:', response.data);

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { type: 'Point', coordinates: [lng, lat] };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw error;
  }
};

module.exports = geocodeAddress;
