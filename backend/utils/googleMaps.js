const { Client } = require('@googlemaps/google-maps-services-js');
const config = require('config');

const client = new Client({});

// Geocode an address to coordinates
async function geocodeAddress(address) {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY || config.get('googleMapsApiKey')
      }
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        coordinates: [location.lng, location.lat],
        formattedAddress: response.data.results[0].formatted_address
      };
    }
    throw new Error('No results found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

// Calculate distance between two points
async function calculateDistance(origin, destination) {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [`${origin[1]},${origin[0]}`],
        destinations: [`${destination[1]},${destination[0]}`],
        key: process.env.GOOGLE_MAPS_API_KEY || config.get('googleMapsApiKey')
      }
    });

    return response.data.rows[0].elements[0];
  } catch (error) {
    console.error('Distance calculation error:', error);
    throw error;
  }
}

module.exports = {
  geocodeAddress,
  calculateDistance
}; 