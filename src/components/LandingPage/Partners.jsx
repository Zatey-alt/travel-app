import React from 'react';
import P1 from '../assets/airbnb logo.png'
import P2 from '../assets/american-airlines logo.png'
import P3 from '../assets/Expedia logo.png'
import P4 from '../assets/Skyscanner logo.png'
import P5 from '../assets/Traveloka logo.png'

const Partners = () => {
  return (
    <div className='partners-row'>
      <div className="text"><h2>Partners</h2></div>
        
     
      <div className="partners-container">   
        <img src={P1} alt="Partner 1" />
        <img src={P2} alt="Partner 2" />
        <img src={P3} alt="Partner 3" />
        <img src={P4} alt="Partner 4" />
        <img src={P5} alt="Partner 5" />
      </div>
    </div>
  );
}

export default Partners;
