import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Video from '../assets/video.mp4';

const Hero = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Discover Your favorite Place  With Us.</h1>
        <p>Your journey begins here with our curated travel experiences. Discover new horizons, create lasting memories, and explore the world with our expertly crafted itineraries.</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faTiktok} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
