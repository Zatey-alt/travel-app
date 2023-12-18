import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularDestinations = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 4;

  useEffect(() => {
    // Check local storage for existing data
    const storedPhotos = localStorage.getItem('travelPhotos');

    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
      setLoading(false);
    } else {
      const fetchTravelPhotos = async () => {
        const options = {
          method: 'GET',
          url: 'https://travel-advisor.p.rapidapi.com/photos/list',
          params: {
            location_id: '2233968',
            currency: 'USD',
            limit: '50',
            lang: 'en_US',
          },
          headers: {
            'X-RapidAPI-Key': '28996fc193msh23df93494ab0231p15e04bjsnf40357310c58',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        };

        try {
          const response = await axios.request(options);
          setPhotos(response.data.data);

          // Store data in local storage
          localStorage.setItem('travelPhotos', JSON.stringify(response.data.data));

          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Error fetching travel photos.');
          setLoading(false);
        }
      };

      fetchTravelPhotos();
    }
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading && <p>Loading travel photos...</p>}
      {error && <p>{error}</p>}
      {currentPhotos.length > 0 && (
        <div>
          <div className="pagination">
            <h2>Travel Photos</h2>
            <div className="row"></div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPhoto >= photos.length}>
              Next
            </button>
          </div>

          <ul className="photo-list">
            {currentPhotos.map((photo) => (
              <li key={photo.photo_id}>
                <img src={photo.images.large.url} alt={photo.caption} className="photo-item" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopularDestinations;
