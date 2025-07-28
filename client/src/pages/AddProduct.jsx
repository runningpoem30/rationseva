import React from 'react'
import { useState } from 'react';

function AddProduct() {
  
  async function fetchCategories(){
    try {
      const result = await fetch("")
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div>
        <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
    <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
    <h1>Hi Vendor , Please Add Your Product</h1>
    <div className="h-[300px] overflow-y-auto p-2 space-y-2 bg-white shadow rounded">

</div>
    <div className='flex flex-col gap-y-[4px] mt-[90px]'>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' placeholder='name'></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' placeholder='unit'></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' placeholder='stock'></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' placeholder='discount'></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' placeholder='description'></input>
      </div>
    </div>
    </div>
    
  )
}

export default AddProduct


