// UpdateProfile.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UpdateProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Update Profile</h2>
      <p>Profile update form goes here</p>
    </div>
  );
};

export default UpdateProfile;
