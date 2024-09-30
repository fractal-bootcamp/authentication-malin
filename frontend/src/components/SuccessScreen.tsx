import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const serverURL = 'http://localhost:3009'

export function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state;

  const token = localStorage.getItem('token')

  const getUserDetails = () => {
    const response = axios.get(serverURL + "/authenticated", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response);
    return response;
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
  }
  return (
    <div>
      <h1>Login Successful!</h1>
      <p>Welcome to your dashboard. {name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}