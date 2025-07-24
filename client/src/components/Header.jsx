import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Search from './Search';


function Header() {
  return (
    <div className='flex border border-gray-1000 p-[25px] gap-[50px]'>
        <div>
            <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
            <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
        </div>
        <Search/>
   

       <div className='ml-[340px]'>
        <Link to={'/login'}><button className="bg-[#54B226] px-[20px] py-[10px] rounded-[4px] mt-[3px] text-white" >Login</button></Link>
            
        </div>
        <div>
          <Cart/>
        </div>

       
    </div>
  )
}

export default Header
