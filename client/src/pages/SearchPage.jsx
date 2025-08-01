import React, { use, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { baseURL } from '@/BaseUrl';
import { data, useNavigate } from 'react-router-dom';
import SingleProduct from '@/components/SingleProduct';
import Header from '@/components/Header';
import { Navigate } from 'react-router-dom';

function Search() {

    const [formData, setFormData] = useState({
      product : ""
    })
    const [dataFromApi , setaDataFromApi] = useState()
    const navigate = useNavigate()
    
    function goToHome(){
        navigate('/home')
    }


    function handleClick(event){
        setFormData({
          ...formData,
          [event.target.name] : event.target.value
        })
    }


    async function handleSubmit(event){
      event.preventDefault()
      try{
            const res = await fetch(`${baseURL}api/view-all-products?name=${formData.product}`,
        {
          method : 'GET',
        }
      )
      const data = await res.json()
      setaDataFromApi(data)
      }
      catch(err){
        console.log(err)
      }

    }


  return (
    <div>
        <div className='flex gap-[400px]'>  
                <div onClick={goToHome} className='border-r border-grey-300 h-full items-center pt-[18px] pr-[10px] cursor-pointer'>
            <span className='text-4xl font-bold text-[#F8CB46]'>Ration</span>
            <span className='text-4xl font-bold text-[#54B226]'>Seva</span>
        </div>

           <div className='relative w-full max-w-md ml-[50px]'>
          <form onSubmit={handleSubmit}>
         <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 mt-[12px] '/>
         <input placeholder="Search For Products" className='border border gray-1000 rounded-2xl w-[450px] py-[10px] pl-[45px] mt-[20px]'
           value={formData.product} name='product' onChange={handleClick}></input>
          </form>
        </div>      </div>
    
        <div className='grid grid-cols-7 gap-x-0 ml-[100px]'>
            {
                dataFromApi && dataFromApi.length > 0 ?  dataFromApi.map((item) => <div className='mt-[30px]'><SingleProduct name={item.name} unit={item.unit} price={item.price} image={item.image[0][0]}/></div>)  :null
            }
        </div>



    </div>
  )
}

export default Search
