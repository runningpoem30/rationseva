import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import Search from './Search';
import Address from './Address';
import { Navigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate()

  function goToHome(){
      navigate('/home')
  }

  return (
    <div className='flex border border-gray-1000 h-[80px] pl-[25px] gap-[50px] items-center'>
        <div onClick={goToHome} className='border-r border-grey-300 h-full items-center pt-[18px] pr-[10px] cursor-pointer'>
            <span className='text-4xl font-bold text-[#F8CB46]'>Ration</span>
            <span className='text-4xl font-bold text-[#54B226]'>Seva</span>
        </div>
        <Address></Address>
        <div className='ml-[20px]'>
            <Search/>
        </div>
      
   

       <div className='ml-[110px]'>
        <Link to={'/login'}><button className="bg-[#54B226] px-[20px] py-[10px] rounded-[4px] mt-[3px] text-white" >Login</button></Link>
            
        </div>
        <div className='-[300px]'>
          <Cart/>
        </div>

       
    </div>
  )
}

export default Header
