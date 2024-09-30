import { Routes, Route } from 'react-router-dom'
import './App.css'
import { SuccessScreen } from './components/SuccessScreen'
import { LoginForm } from './components/LoginForm'
import { useNavigate } from 'react-router-dom'

function App() {
  // const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/success" element={<SuccessScreen />} />
      </Routes>
    </>
  );
}

export default App


