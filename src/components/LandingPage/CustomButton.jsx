import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({ to, children, backgroundColor, textColor, borderColor }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || '#3498db',
    color: textColor || '#fff',
    display: 'inline-block',
    padding: '10px 20px',
    border: `2px solid ${borderColor || '#181818'}`, 
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '10px',
  
  };

  return (
    <Link to={to} style={buttonStyle}>
      {children}
    </Link>
  );
}

export default CustomButton;
