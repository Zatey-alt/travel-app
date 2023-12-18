import axios from 'axios';

const API_KEY_HOTELS = 'ff6be03305msh47d12d13d610825p169eb0jsnb4f74133c384';

export const getHotelPrices = async (location) => {
  try {
    const response = await axios.get('https://hotels4.p.rapidapi.com/properties/list', {
      headers: {
        'X-RapidAPI-Key': API_KEY_HOTELS,
      },
      params: {
        destinationId: location, // Include the destination ID or other relevant parameters
      },
    });
    return response.data.data.body.searchResults.results;
  } catch (error) {
    console.error('Error fetching hotel prices:', error);
    return [];
  }
};