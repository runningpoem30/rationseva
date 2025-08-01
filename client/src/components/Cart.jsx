import React from 'react'
import { FiShoppingCart } from "react-icons/fi";

function Cart() {
  
  return (
    <div className='relative'>
        <FiShoppingCart className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white'/>
       <button className="bg-green-900 px-[12px] py-[10px] rounded-[4px] mt-[3px] text-white pl-[40px]">
                My Cart
            </button>
    </div>
  )
}

export default Cart
