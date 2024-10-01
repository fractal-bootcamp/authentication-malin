import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserLogin {
  name: string;
  password: string;
}


export function LoginForm() {
  const navigate = useNavigate();
  const serverURL = 'http://localhost:3009'

  const [userLoginDetails, setUserLoginDetails] = useState<UserLogin>({
    name: '',
    password: ''
  })
  const [formAction, setFormAction] = useState<string>('')
  // create a navigation function using the useNavigate() hook

  // QUESTION: why does this need to be an async function??
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formAction === "login") {
      try {
        const response = await axios.post(serverURL + "/login", userLoginDetails);
        console.log(response.data.token)
        console.log(response)
        const token = response.data.token
        // store the token in the built-in web storage object
        localStorage.setItem('token', token)
        // navigate to the next page
        navigate('/success', {
          state: userLoginDetails.name
        })

      } catch (error) {
        console.error("Login failed: ", error);
        alert(`${error.response.data.message}`)
      }

    } else if (formAction === "signup") {
      try {
        const response = await axios.post(serverURL + "/signup", userLoginDetails);
        console.log(response.data.token);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/success', {
          state: userLoginDetails.name
        });
      } catch (error) {
        console.error("Signup failed: ", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
        alert(`Signup failed: ${error.response ? error.response.data.message : error.message}`);
      }
    }
  }

  return (
    <>
      <header>Basic Authentication App</header>
      <form onSubmit={handleSubmit}>
        <h4>Login or Sign up With Your Details</h4>
        <div>
          name:
          <input value={userLoginDetails.name} onChange={(e) => setUserLoginDetails(prevDetails => ({ ...prevDetails, name: e.target.value }))} />
        </div>
        <div>
          password:
          <input value={userLoginDetails.password} onChange={(e) => setUserLoginDetails(prevDetails => ({ ...prevDetails, password: e.target.value }))} />
        </div>
        <button type="submit" onClick={() => setFormAction('login')}>Login</button>
        <button type="submit" onClick={() => setFormAction('signup')}>Sign Up</button>
      </form>
    </>
  )
}