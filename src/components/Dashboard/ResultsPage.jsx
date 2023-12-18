import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Auth/LoadingSpinner';
import SearchResultList from '../Dashboard/SearchResultList';
import NotFoundPage from './NotFoundPage';
import WeatherDisplay from './WeatherDisplay';

const ResultPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showNotFound, setShowNotFound] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const storedSearchResults = localStorage.getItem('searchResults');

    if (storedSearchResults) {
      setSearchResults(JSON.parse(storedSearchResults));
    }
  }, []);

  

  const fetchForecastData = async (latitude, longitude) => {
    const forecastOptions = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
      params: {
        lat: latitude,
        lon: longitude,
      },
      headers: {
        'X-RapidAPI-Key': '28996fc193msh23df93494ab0231p15e04bjsnf40357310c58',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(forecastOptions);
      setForecastData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
  
    try {
      setSearchResults([]);
      setShowNotFound(false);
  
      const response = await axios.get(
        'https://travel-advisor.p.rapidapi.com/locations/search',
        {
          params: {
            query: query,
            limit: '1',
            offset: '0',
            units: 'km',
            currency: 'USD',
            sort: 'relevance',
            lang: 'en_US',
          },
          headers: {
            'X-RapidAPI-Key':
              '1db6e7eab3msh16fa81911eb662cp18f58ejsnd9d5674d1e88',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        }
      );
  
      const locationId = response.data.data[0]?.result_object?.location_id;
  
      if (locationId) {
        const locationDetails = {
          locationId,
          locationName: response.data.data[0].result_object.name,
        };
  
        setSearchResults([locationDetails]);
  
        const { latitude, longitude } = response.data.data[0].result_object;
        await fetchForecastData(latitude, longitude);
  
        const listEndpoints = [
          'https://travel-advisor.p.rapidapi.com/restaurants/list',
          'https://travel-advisor.p.rapidapi.com/hotels/list',
          'https://travel-advisor.p.rapidapi.com/attractions/list',
        ];
  
        const detailEndpoints = [
          'https://travel-advisor.p.rapidapi.com/restaurants/get-details',
          'https://travel-advisor.p.rapidapi.com/hotels/get-details',
          'https://travel-advisor.p.rapidapi.com/attractions/get-details',
        ];
  
        const listPromises = listEndpoints.map((endpoint) =>
          fetchData(endpoint, locationId)
        );
  
        const detailPromises = detailEndpoints.map((endpoint) =>
          fetchData(endpoint, locationId, true)
        );
  
        const [restaurantsList, hotelsList, attractionsList, 
               restaurantsDetails, hotelsDetails, attractionsDetails] = await Promise.all([
          ...listPromises,
          ...detailPromises,
        ]);
  
        const allResults = [
          ...restaurantsList,
          ...hotelsList,
          ...attractionsList,
          ...restaurantsDetails,
          ...hotelsDetails,
          ...attractionsDetails,
        ];
  
        setSearchResults(allResults);
  
        applyFilters(allResults);
  
        localStorage.setItem(
          'searchResults',
          JSON.stringify(allResults)
        );
      } else {
        setShowNotFound(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchData = async (url, locationId, isDetailsEndpoint = false) => {
    try {
      const response = await axios.get(url, {
        params: {
          location_id: locationId,
          limit: isDetailsEndpoint ? '1' : '10',
          currency: 'USD',
          lunit: 'km',
          lang: 'en_US',
        },
        headers: {
          'X-RapidAPI-Key': '1db6e7eab3msh16fa81911eb662cp18f58ejsnd9d5674d1e88',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      const results = response.data.data.map((result) => {
        console.log(`Price: ${result.price}, Web URL: ${result.web_url}`);
  
        return {
          locationId: result.location_id,
          locationName: result.name,
          type: result.result_type,
          image: result.photo && result.photo.images && result.photo.images.medium.url,
          price: result.price,
          rating: result.rating,
          web_url: result.web_url, 
          booking: result.booking && result.booking.url, 
        };
      });
  
      return results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  

  const applyFilters = (results) => {
    let filteredResults = [...results];
  
    if (ratingFilter) {
      filteredResults = filteredResults.filter(
        (result) => result.rating >= parseFloat(ratingFilter)
      );
    }
  
    if (typeFilter) {
     
      filteredResults = filteredResults.filter(
        (result) => result.result_type === typeFilter
      );
    }
  
    setSearchResults(filteredResults);
  };
  

  return (
    <div className="result-container">
      <h1>
        Explore{' '}
        {searchResults.length > 0 && searchResults[0].locationName}
      </h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a location"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Search'}
        </button>
      </div>
      <div className="filters">
        <label>
          Rating:
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        
        <label>
          Type:
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="lodging">Hotel</option> 
            <option value="geos">Attraction</option> 
            <option value="restaurants">Restaurant</option> 
          </select>
        </label>
        
      </div>

      <WeatherDisplay forecastData={forecastData} />
      <div className="details-container">
        {showNotFound ? (
          <NotFoundPage />
        ) : (
          <>
            <SearchResultList searchResults={searchResults} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
