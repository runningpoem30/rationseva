import React from 'react'
import { Link } from 'react-router-dom'

function Address() {
  return (
    <Link to={'/add-address'}>
    <div className="">
    <span className="font-semibold text-[18px]">Add your Address</span>
    <div className="flex items-center text-sm text-gray-600">
      <span>To Get Nearest Vendors</span>
    </div>
  </div></Link>
  

  )
}

export default Address
