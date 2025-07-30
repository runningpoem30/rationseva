import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { baseURL } from '@/BaseUrl';


function AddAdressPage() {
    const [formData, setFormData] = useState({
        addressLine : "",
        city : "",
        state :"",
        pincode : "",
        mobile : ""
    })

   
 
        const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

        let role;
        if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role; // 'user' or 'vendor'
        }
        console.log(token)


   async function handleSubmit(event){
        event.preventDefault()
        const endpoint = role === 'vendor' ? `${baseURL}api/vendor/add-address` : `${baseURL}api/user/add-address`
        try{

             const res = await fetch(endpoint , {
              method : 'POST',
              headers : {
                "Content-Type" : "application/json",
                 "Authorization": `Bearer ${token}`
              },
              body : JSON.stringify(formData),
              credentials : 'include'
             })

        }
        catch(error){
            console.log(error)
        }
    }

    function handleClick(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    console.log(formData)
     

  return (
    <div>
        <div>
            <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
            <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
        </div>

      <div>
        <div>
           <form onSubmit={handleSubmit} className='ml-[400px] mt-[100px]'>
               <div className='flex flex-col gap-y-[4px] mt-[90px]'>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='addressLine' placeholder='Address Line' value={formData.addressLine} onChange={handleClick}></input>
                 </div>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]'name='city' placeholder='city' value={formData.city} onChange={handleClick}></input>
                 </div>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name ='state' placeholder='state' value={formData.state} onChange={handleClick}></input>
                 </div>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='pincode' placeholder='pincode' value={formData.pincode} onChange={handleClick}></input>
                 </div>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name='mobile' placeholder='mobile' value={formData.mobile} onChange={handleClick}></input>
                 </div>
                <div >
                 
               </div>
           
           
               </div>
               <div>
                 <button className='border border-gray-300 py-[12px] px-4 rounded-2xl bg-[#54B226] text-white font-bold mt-[10px]'> Add Address</button>
                
               </div>
              </form>
        </div>

      </div>
    </div>
  )
}

export default AddAdressPage
