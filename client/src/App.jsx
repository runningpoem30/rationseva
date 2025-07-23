import './App.css'
import { Routes , Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import CommonComponentLanding from './components/CommonComponentLanding'
import LoginPage from './pages/LoginPage'
import VerifyYourEmail from './extras/VerifyYourEmail'
import UserVerified from './pages/UserVerified'

function App() {

  return (
  
    <Routes>
      <Route path='/signup' element={<SignupPage/>}/>  
      <Route path='/test' element={<CommonComponentLanding/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/verify-your-email' element={<VerifyYourEmail/>}/>
      <Route path='/api/user/verify/:userId/:token' element={<UserVerified/>}/>
    </Routes>
 
   
  )
}

export default App
