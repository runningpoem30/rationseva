import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import CommonComponentLanding from './components/CommonComponentLanding'
import LoginPage from './pages/LoginPage'
import VerifyYourEmail from './extras/VerifyYourEmail'

function App() {

  return (
  
    <Routes>
      <Route path='/signup' element={<SignupPage/>}/>  
      <Route path='/test' element={<CommonComponentLanding/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/verify-your-email' element={<VerifyYourEmail/>}/>
    </Routes>
 
   
  )
}

export default App
