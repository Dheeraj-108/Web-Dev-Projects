const axios = require('axios');
const apiKey = '7ChPVwYFDS9Gow0WMrp3';

async function geocodeAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);     
        const url = `https://api.maptiler.com/geocoding/${encodedAddress}.json?key=${apiKey}`;
        const response = await axios.get(url);

        const result = response.data.features[0];
        const coordinates = result.geometry.coordinates;

        console.log(`Coordinates for ${address}:`);
        console.log(`Longitude: ${coordinates[0]}`);
        console.log(`Latitude: ${coordinates[1]}`);
        
    } catch (error) {
        console.error('Error during geocoding:', error);
    }
}

async function reverseGeocode(latitude, longitude) {
    try {
        const url = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${apiKey}`;       
        const response = await axios.get(url);
        const result = response.data.features[0];

        console.log(`Address for coordinates [${latitude}, ${longitude}]:`);
        console.log(result.text);
        
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
}

module.exports = {geocodeAddress, reverseGeocode};
