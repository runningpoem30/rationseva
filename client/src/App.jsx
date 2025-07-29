import './App.css'
import { Routes , Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import CommonComponentLanding from './components/CommonComponentLanding'
import LoginPage from './pages/LoginPage'
import VerifyYourEmail from './extras/VerifyYourEmail'
import UserVerified from './pages/UserVerified'
import HomePage from './pages/HomePage'
import VendorSignup from './pages/VendorSignup'
import VendorVerified from './pages/VendorVerify'
import AddProduct from './pages/AddProduct'
import VendorLoginPage from './pages/VendorLoginPage'
import VendorDashboard from './pages/VendorDashboard'


function App() {

  return (
  
    <Routes>
      <Route path='/signup' element={<SignupPage/>}/>  
      <Route path='/test' element={<CommonComponentLanding/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/verify-your-email' element={<VerifyYourEmail/>}/>
      <Route path='/api/user/verify/:userId/:token' element={<UserVerified/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/vendor-signup' element={<VendorSignup/>}/>
      <Route path='/api/vendor/verify/:userId/:token' element={<VendorVerified/>}/>
      <Route path='/vendor/add-product' element={<AddProduct/>}/>
      <Route path='/vendor-login' element={<VendorLoginPage/>}/>
      <Route path='/vendor-dashboard' element={<VendorDashboard/>}/>
    </Routes>
 
   
  )
}

export default App
