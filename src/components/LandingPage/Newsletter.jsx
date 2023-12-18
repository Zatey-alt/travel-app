import React from 'react';

const Newsletter = () => {
  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscribed!');
  };

  return (
    <div className="newsletter">
      <p>Join our newsletter to stay up to date</p>
      <div>
        <input type="email" placeholder="Enter your email" />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
