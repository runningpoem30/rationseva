// geoCodeAddress.js
const axios = require("axios");

const geoCodeAddress = async(address) => {  // Add address parameter
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}`
    );

    const [longitude, latitude] = response.data.features[0].center; // Fix typo and order
    return [longitude, latitude];
  } catch(error) {
    console.error("Geocoding error:", error.message);
    throw new Error("Geocoding failed. Please check the address and try again.");
  }
};

module.exports = { geoCodeAddress };