import React, { useEffect } from 'react'
import { useState } from 'react';
import { baseURL } from '@/BaseUrl';
import { IoIosArrowDropdown } from "react-icons/io";
import toast , {Toaster} from 'react-hot-toast';



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
   const { name , files , value , type } = event.target;

   setFormData({
    ...formData,
    [name] : type === 'file' ? files[0] : value
   })
  }

  async function handleSubmit(event){
    event.preventDefault()
    const formDataToSend = new FormData();
    formDataToSend.append("name" , formData.name);
    formDataToSend.append("unit" , formData.unit);
    formDataToSend.append("stock" , formData.stock);
    formDataToSend.append("description" , formData.description)
    formDataToSend.append("discount" , formData.discount);
    formDataToSend.append("images" , formData.images);
    formDataToSend.append("categoryName" , formData.category)
    console.log(formData.name , formData.images)
    try{
      const result = await fetch(`${baseURL}api/create-product`,{
        method : 'POST',
        credentials : 'include',
        body : formDataToSend
      })
      const data = await result.json();
      console.log("response" , data.data)
      if(data){
        toast.success(data.message);
        setFormData({
            name :'',
            unit :'',
            stock : '',
            discount :'',
            description :'',
            createdBy :'',
            images :'',
            category :''
        })
      }
    }
    catch(err){
      console.log(err.createdBy)
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
      <Toaster position='top-center'/>

    <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
    <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
    <h1>Hi Vendor , Please Add Your Product</h1>

   <form onSubmit={handleSubmit} className='ml-[400px] mt-[100px]'>
    <div className='flex flex-col gap-y-[4px] mt-[90px]'>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='name' placeholder='name' value={formData.name} onChange={handleClick}></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]'name='unit' placeholder='unit' value={formData.unit} onChange={handleClick}></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name ='stock' placeholder='stock' value={formData.stock} onChange={handleClick}></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='discount' placeholder='discount' value={formData.discount} onChange={handleClick}></input>
      </div>
      <div>
        <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='description' placeholder='description' value={formData.description} onChange={handleClick}></input>
      </div>
     <div className="inline-block">
      
      <div> <button
        onClick={toggleDropDown}
        className='flex items-center justify-between font-grey-100 border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer w-[290px]'
      >
        <span>Category</span>
        <IoIosArrowDropdown className='text-xl' />
      </button></div>

   {showDropDown && (
  <div className="absolute mt-2 space-y-2">
    {data?.length > 0 &&
      data.map((item) => (
        <div
          key={item._id}
          onClick={() => {
            setFormData({ ...formData, category: item.name }); 
            setShowDropDown(false); 
            console.log("Selected category:", item.name);
          }}
          className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer w-[290px]'
        >
          {item.name}
        </div>
      ))}
  </div>
)}
    </div>
  <div>
  <label 
    htmlFor="images"
    className="border border-gray-300 py-[12px] px-4 rounded-2xl bg-gray-100 cursor-pointer inline-block w-[290px]"
  >
    Add Images
  </label>

  <input
    type="file"
    id="images"
    name="images"
    accept="image/*"
    onChange={handleClick}
    style={{ display: 'none' }} // hides default input
  />
</div>

    </div>
    <div>
      <button className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-[#54B226] text-white font-bold mt-[10px]'> Submit Button</button>
     
    </div>
   </form>
    
    </div>
    
  )
}

export default AddProduct


  




// backend pe request ja toh rha hai , now i have to login and save the data on the frontend