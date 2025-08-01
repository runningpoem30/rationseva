import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import Search from './Search';
import Address from './Address';
import UserSection from './UserSection';
import VendorSignUpButton from './VendorSignUpButton';

function Header() {
  const navigate = useNavigate();

  function goToHome() {
    navigate('/home');
  }

  return (
    <div className='sticky top-0 z-50 flex justify-between items-center px-6 h-[80px] bg-white shadow-md'>
      
      {/* Left Section: Logo */}
      <div
        onClick={goToHome}
        className='flex items-center border-r border-gray-300 pr-4 cursor-pointer'
      >
        <span className='text-3xl font-bold text-[#F8CB46]'>Ration</span>
        <span className='text-3xl font-bold text-[#54B226] ml-1'>Seva</span>
      </div>

      {/* Center Section: Address + Search */}
      <div className='flex items-center gap-6 flex-grow px-6'>
        <Address />
        <div className='flex-grow max-w-[400px]'>
          <Search />
        </div>
      </div>

      {/* Right Section: User + Cart + Vendor Button */}
      <div className='flex items-center gap-4'>
        <UserSection />
        <Cart />
        <VendorSignUpButton />
      </div>
    </div>
  );
}

export default Header;
