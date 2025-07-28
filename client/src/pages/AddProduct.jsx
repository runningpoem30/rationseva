import React, { useEffect } from 'react'
import { useState } from 'react';
import { baseURL } from '@/BaseUrl';
import { IoIosArrowDropdown } from "react-icons/io";


function AddProduct() {
  
  const [data , setData] = useState();
  const [showDropDown , setShowDropDown] = useState(false);
  const [formData, setFormData] = useState({
    name :'',
    unit :'',
    stock : '',
    discount :'',
    description :'',
    createdBy :'',
    images :'',
    category :''
  })

 function handleClick(event){
      setFormData({...formData ,
       [event.target.name] : event.target.value
      })
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const result = await fetch(`${baseURL}api/create-product`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })


      const data = await result.json();
      console.log("response" , data)
    }
    catch(err){
      console.log(err)
    }
  }


  function toggleDropDown(){
      setShowDropDown((prev) => !prev);
  }

  async function fetchCategories(){
    try {
      const result = await fetch(`${baseURL}api/get-all-categories`)
      const fetchData = await result.json()
      console.log(fetchData.data)
      setData(fetchData.data)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCategories()
  },[])



  return (
    <div>

        <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
    <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
    <h1>Hi Vendor , Please Add Your Product</h1>

   <form onSubmit={handleSubmit}>
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
     <div className="relative inline-block">
      <button
        onClick={toggleDropDown}
        className='flex items-center justify-between font-grey-100 border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer w-[335px]'
      >
        <span>Category</span>
        <IoIosArrowDropdown className='text-xl' />
      </button>

      {showDropDown && (
        <div className="absolute mt-2 space-y-2">
          {data?.length > 0 &&
            data.map((item) => (
              <div
                key={item._id}
                className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer w-[335px]'
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
    <div>
      <label htmlFor=""><input type='file' id='file' className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer w-[335px]'></input></label>
    </div>
    </div>
    <div>
      <button onClick={handleClick}className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-[#54B226] text-white font-bold mt-[10px]'> Submit Button</button>
     
    </div>
   </form>
    
    </div>
    
  )
}

export default AddProduct


  




// backend pe request ja toh rha hai , now i have to login and save the data on the frontend