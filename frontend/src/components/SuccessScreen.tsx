import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state;

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
  }
  return (
    <div>
      <h4>Login Successful!</h4>
      <p>welcome to your dashboard {name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}