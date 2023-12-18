import React from 'react';

const SearchResultList = ({ searchResults, searchQuery }) => {
  const handleResultClick = (web_url) => {

    window.open(web_url, '_blank');
  };

  const handleBookingButtonClick = (booking) => {
 
    window.open(booking, '_blank');
  };

  return (
    <div className="search-results">
      <h2>
        {searchQuery ? `Results for "${searchQuery}":` : 'Search Results:'}{' '}
        {searchResults.length} results found
      </h2>

      <ul>
        {searchResults.map(({ locationId, web_url, image, locationName, type, price, rating, booking }) => (
          <li
            key={locationId}
            onClick={() => handleResultClick(web_url)}
            style={{ cursor: 'pointer' }}
          >
            <div>
              {image && <img src={image} alt={locationName} />}
            </div>
            <div>
              <div className='Location-name'>
                <strong>{locationName}</strong> {type}
              </div>
              {type && (
                <p>
                  {type === 'lodging' && <i className="fas fa-hotel"></i>}
                  {type === 'geos' && <i className="fas fa-landmark"></i>}
                  {type === 'restaurants' && <i className="fas fa-utensils"></i>}
                </p>
              )}
              <div className="details-container">
                {price && <p>{price}</p>}
                {rating && (
                  <p>
                    <i className="fas fa-thumbs-up"></i> {rating}
                  </p>
                )}
                {booking && (
                 <button
                 onClick={() => handleBookingButtonClick(booking)}
                 className="book-now-button"
               >
                 Book Now
               </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
