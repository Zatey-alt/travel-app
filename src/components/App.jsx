import React from 'react';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard/Dashboard';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import ForgotPassword from './Auth/ForgotPassword';
import UpdateProfile from './Dashboard/UpdateProfile';
import LandingPage from '../Pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
