import React from 'react';
import CustomButton from './CustomButton';
import Logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <div className="navigation fixed-top"> 
      <nav>
      <label className="logo"><img src={Logo}  height = {150}   alt="" srcset="" /></label>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
       
        <ul>
          <li><a className="active" href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Feedback</a></li>
          <CustomButton to="/login" backgroundColor="#fff" textColor="#181818">Login</CustomButton>
          <CustomButton to="/signup" backgroundColor="#181818" textColor="#fff" borderColor = '#fff'>Signup</CustomButton>
        </ul>
    
      </nav>
    </div>
  );
}

export default NavBar;
