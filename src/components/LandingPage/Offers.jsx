import React from 'react'
import S from '../assets/s.png'

const Offers = () => {
  return (
    <div className='offer'>
        <div className="server">
            <h2>Embark on unforgettable journeys <br></br> with our premium travel services</h2>
            <p>Picture-perfect getaways are just a click away. Find your slice of paradise,<br /> whether it's a tropical island,
               a charming city, or an enchanting countryside retreat.</p>
        </div>
      <div className="layout-image">
        <img src={S} alt="" width={400} />
      </div>
    </div>
  )
}

export default Offers
