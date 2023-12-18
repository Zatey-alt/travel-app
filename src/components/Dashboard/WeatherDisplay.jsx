import React from 'react';

const WeatherDisplay = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      <ul>
        {forecastData.slice(0, 5).map((data, index) => (
          
          <li key={index} className="forecast-item">
            <p>{data.weather.icon}</p>
            <p id='temp'>{data.app_temp}°C</p>
            <p>{data.weather.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
