import React from 'react'
import image from '../assets/Image.png'
import CustomButton from './CustomButton'

const Service = () => {
  return (
    <div className='offer'>
         <div className="layout-image">
        <img src={image} alt="" width={400} />
      </div>
        <div className="server">
            <h2>With Our Service We Will Explore Something Different</h2>
            <p>Uncover hidden gems and immerse yourself in vibrant cultures. From breathtaking landscapes to awe-inspiring destinations, let us guide you to the most extraordinary places on the planet.</p>
            <CustomButton to="/signup" backgroundColor="#181818" textColor="#fff" borderColor = '#fff'>Explore More</CustomButton>
        </div>
     
    </div>
  )
}

export default Service
