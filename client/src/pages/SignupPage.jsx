import React, { useState } from 'react'
import useFetch from '../hooks/UseFetch'
import { useNavigate } from 'react-router-dom'
import CommonComponentLanding from '@/components/CommonComponentLanding'
import { Link } from 'react-router-dom';


function SignupPage() {

    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })
    

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }
 
 

    async function handleSubmit (event){
        event.preventDefault()

        try{
            const res = await fetch("http://localhost:8000/api/user/signup", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })


            const data = await res.json()
            console.log("response" , data)
        }
        catch(err){
            console.log("error sending data" , err);
            
        }

        setFormData({
          name: '',
          email: '',
          password: ''
       });
    }

  return (
    <div>
     
        <div className='flex flex-row'>
            <CommonComponentLanding/>
        <form onSubmit={handleSubmit}>
                 
            <div className="flex flex-col space-y-4 items-center justify-center h-screen ">
                <div className='space-y-9 ml-[300px]'>
                <h1 className='text-5xl font-bold text-gray-800'>Sign in to RationSeva</h1>
                <div className='ml-[80px] space-y-4'>
<div>
                      <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px] 'name="name"value={formData.name} onChange={handleChange} placeholder='Name'></input>
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

export default SignupPage



//“Daily Needs. Multiple Vendors. One Platform.”