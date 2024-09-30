import { useState } from 'react'
import './App.css'
import axios from 'axios'

const serverURL = 'http://localhost:3009'

function App() {

  interface userLogin {
    name: string;
    password: string;
  }

  const [userLoginDetails, setUserLoginDetails] = useState<userLogin>({
    name: '',
    password: ''
  })

  const [formAction, setFormAction] = useState<string>('')
  const [token, setToken] = useState<string>('')

  const submitFormToServer = async (e) => {
    const createdSurvey = { name: surveyName, questions: questions }

    e.preventDefault(); // Prevent the default form submission behavior
    const response = await axios.post(serverURL + "/create", createdSurvey);
    // const response = otherMachine.sum(2, 2)
    console.log(response)
    location.reload();
  };

  // QUESTION: why does this need to be an async function??
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formAction === "login") {
      const response = await axios.post(serverURL + "/login", userLoginDetails);
      console.log(response.data.token)
      const token = response.data.token
      // setToken(response.data.token);
      if token



    } else if (formAction === "signup") {
      axios.post();
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

export default App
