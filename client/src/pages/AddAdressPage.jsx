import React, { useState } from 'react'


function AddAdressPage() {
    const [formData, setFormData] = useState({
        addressLine : "",
        city : "",
        state :"",
        pincode : "",
        mobile : ""
    })

   async function handleSubmit(){

    }

    async function handleClick(){

    }
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
