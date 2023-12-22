import React from 'react'
import NavBar from '../components/LandingPage/NavBar'
import Hero from '../components/LandingPage/Hero'
import Partners from '../components/LandingPage/Partners'
import PopularDestinations from '../components/LandingPage/PopularDestinations'
import Offers from '../components/LandingPage/Offers'
import Service from '../components/LandingPage/Service'
import Newsletter from '../components/LandingPage/Newsletter'
import Footer from '../components/LandingPage/Footer'

const LandingPage = () => {
  return (
    <div className='LandingPage'>
        <div className="navbar"><NavBar /></div>
        <div className="hero-section"><Hero /></div>
        <div className="partners"><Partners /></div>
        <div className="popular-destinations"><PopularDestinations /></div>
        <div className="offers"><Offers/></div>
        <div className="service"><Service/></div>
        <div className="Footer"><Footer/></div>
      
    </div>
  )
}

export default LandingPage
