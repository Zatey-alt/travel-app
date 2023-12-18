// src/services/attractionsService.js
import axios from 'axios';

const API_KEY_YELP = 'your_yelp_api_key';

export const getAttractions = async (location) => {
  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${API_KEY_YELP}`,
      },
      params: {
        location,
        categories: 'attractions', // Adjust categories as needed
      },
    });
    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }
};