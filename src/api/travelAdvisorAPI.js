
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key':  'ff6be03305msh47d12d13d610825p169eb0jsnb4f74133c384',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
  
      const apiKey = 'd0b8e0ac9652a57ed7f96f4c539a9454';

      const { data } = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: { lat, lon: lng, appid: apiKey },
      });

      return data;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};
