import { Routes, Route } from 'react-router-dom'
import '../App.css'
import { SuccessScreen } from '../components/SuccessScreen'
import { LoginForm } from '../components/LoginForm'

function Root() {
  return (
    <LoginForm />
  );
}

export default Root