import './App.css'
import { Routes , Route, useNavigate } from 'react-router-dom'
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
import AddAdressPage from './pages/AddAdressPage'
import GoToCategory from './pages/GoToCategory'
import SingleProduct from './components/SingleProduct'
import GoToSpecificProductPage from './pages/GoToSpecificProductPage'
import CategoryWiseDataOnHomePage from './components/CategoryWiseDataOnHomePage'
import CategoryOnHomePage from './pages/CategoryOnHomePage'
import SearchPage from './pages/SearchPage'
import Footer from './components/Footer'
import CartPage from './pages/LeadToCartPage'
import MakePayment from './pages/MakePayment'
import { Navigate } from 'react-router-dom'

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
      <Route path='/vendor/add-products' element={<AddProduct/>}/>
      <Route path='/vendor-login' element={<VendorLoginPage/>}/>
      <Route path='/vendor-dashboard' element={<VendorDashboard/>}/>
      <Route path='/add-address' element={<AddAdressPage/>}/>
      <Route path='/category' element={<GoToCategory/>}/>
      <Route path='/single-product' element={<SingleProduct/>}/>
      <Route path='/product/:productId' element={<GoToSpecificProductPage/>}/>
      <Route path='/category-wise' element={<CategoryWiseDataOnHomePage/>} />
      <Route path='/category-home-page' element={<CategoryOnHomePage/>}/>
      <Route path='/search-path' element={<SearchPage/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/to-cart-page' element={<CartPage/>}/>
      <Route path='/make-payment' element={<MakePayment/>}/>
      <Route path="*" element={<Navigate to="/home" />} />

    </Routes>
 
   
  )
}

export default App
