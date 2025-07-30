import React, { useState } from 'react'
import toast , {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function VendorSignup() {
    const [formData , setFormData] = useState({
        shopName : "",
        email : "",
        password  : ""
    })
    const navigate = useNavigate()

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value 
        })
    }

      function verifyYourEmail(){
        navigate('/verify-your-email')
    }
 

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const  res = await fetch('http://localhost:8000/api/vendor/create-vendor' , {
                method : "POST",
                body : JSON.stringify(formData),
                 headers: {
       "Content-Type": "application/json"
     },
            })

            const result = await res.json()
            console.log("resposne" , result)
            if(result?.success  === true){
                toast.success(result?.message)

                setTimeout(() => {
                    verifyYourEmail()
                }, 2000);
            }
            else {
                toast.error(result?.message || 'something went wrong')
            }

            setFormData({
                shopName : "",
                email : "",
                password : ""
          })
        }
        catch(err){
            console.log(err)
        }
    }

      return (
    <div>
        <Toaster position="top-center" />
     
        <div className='flex flex-row'>
             <div className='flex flex-row'>
  <div>
    <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
    <span className='text-5xl font-bold text-[#54B226]'>Seva</span>

    <h1 className="text-8xl font-bold text-gray-800">
      <div className='py-[180px] flex flex-col leading-none'>
        <span>Your Ration.</span>
        <span>Your Store.</span>
        <span>Your Profit.</span>
      </div>
    </h1>
  </div>
</div>

        <form onSubmit={handleSubmit}>
          
                 
            <div className="flex flex-col space-y-4 items-center justify-center h-screen ">
                <div className='space-y-9 ml-[300px]'>
                <h1 className='text-5xl font-bold text-gray-800'>Sign in to RationSeva</h1>
                <div className='ml-[80px] space-y-4'>
<div>
                      <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px] 'name="shopName"value={formData.shopName} onChange={handleChange} placeholder='Name'></input>
                </div>
                <div>
                    <input  className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]'name="email"value={formData.email} onChange={handleChange} placeholder='Email'></input>
                </div>
                <div>
                    <input  className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name="password" value={formData.password} onChange={handleChange} placeholder='Password'></input>
                </div>
                <div>
                    <button   className='border border-gray-300 p-[15px] pl-[100px] pr-[100px] rounded-2xl mt-[20px] bg-[#F8CB46] ml-[40px]
 text-xl text-white'>Signup</button>
                </div>
                <div className='ml-[15px]'>
                    <h1 className="ml-[70px] text-sm">
                    Already a user?{' '}
                    <Link to="/login" className="text-green-600 underline hover:text-green-800 cursor-pointer">
                        Sign In
                    </Link>
                    </h1>    
                </div>
                    
                </div>
                </div>
                

            </div>
            
           
        </form>
        </div>
      
    </div>
  )
}

export default VendorSignup
