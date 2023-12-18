import axios from 'axios';

const API_KEY = 'd0b8e0ac9652a57ed7f96f4c539a9454';

export const getWeather = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
