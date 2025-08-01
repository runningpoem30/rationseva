import React from 'react';
import { useNavigate } from 'react-router-dom';

function VendorSignUpButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/vendor-signup'); // Change route as needed
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-[#54B226] border border-[#54B226] hover:bg-[#54B226] hover:text-white px-4 py-2 rounded-[6px] text-sm font-medium transition duration-200"
    >
      Sign up as a Vendor
    </button>
  );
}

export default VendorSignUpButton;
