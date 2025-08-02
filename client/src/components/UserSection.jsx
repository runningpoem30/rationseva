// components/UserSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '@/BaseUrl';

function UserSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(`${baseURL}api/whoami`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();
        console.log("whoami response:", data); // for debugging

        if (res.ok && data?.role) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Error checking login:', err);
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    }

    checkLogin();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`${baseURL}api/user/get-user-details`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      console.log('User details:', data);
      // You can also navigate or store data if needed
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  if (isChecking) {
    return null; // or return a spinner if you want
  }

  if (!isLoggedIn) {
    return (
      <div className="ml-[110px]">
        <Link to="/login">
          <button className="bg-[#54B226] px-[20px] py-[10px] rounded-[4px] mt-[3px] text-white">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="ml-[110px] relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <button className="bg-[#54B226] px-[20px] py-[10px] rounded-[4px] mt-[3px] text-white">
        My Account
      </button>

      {showDropdown && (
        <div className="absolute top-[110%] left-0 bg-white border shadow-md rounded-md w-[160px] z-10">
          <button
            onClick={fetchUserDetails}
            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
          >
            My Profile
          </button>
          {/* You can add more dropdown items here */}
        </div>
      )}
    </div>
  );
}

export default UserSection;
