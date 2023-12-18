// Dashboard.jsx

import React, { useState } from "react";
import { Navbar, Nav, Dropdown, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import ResultPage from "./ResultsPage";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout, isLoggedIn, user } = useAuth();

  // Check if isLoggedIn is false, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/landing-page" />;
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      // Redirect to login after logout
      return <Navigate to="/landing-page" />;
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark d-flex justify-content-between align-items-center" expand="lg">
        <Navbar.Brand>Travel Trust Test</Navbar.Brand>
        <Nav className="ml-auto">
          {error && <Alert variant="danger">{error}</Alert>}
          {user && user.email && <p className="text-white p-4">{user.email}</p>}

          <Dropdown className="p-4">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu className="mr-5 custom-dropdown-menu">
              <Dropdown.Item as={Link} to="/update-profile">
                Update Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
   <ResultPage />
    </>
    
  );
}
