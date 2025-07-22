import React, { useState } from 'react'
import useFetch from '../hooks/UseFetch'
import { useNavigate } from 'react-router-dom'
import CommonComponentLanding from '@/components/CommonComponentLanding'


function SignupPage() {

    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })
    
    const navigate = useNavigate()

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
    }

  return (
    <div>
     
        <div className='flex flex-row'>
            <CommonComponentLanding/>
        <form onSubmit={handleSubmit}>
                 
            <div className="flex flex-col space-y-4 items-center justify-center h-screen ">
                <div className='space-y-4 ml-[300px]'>
                <h1 className='text-5xl font-bold text-lime-400'>Please Signup To Continue</h1>
                <h4 className='text-gray-800'>Please Signup to Continue</h4>
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
                    <button   className='border border-gray-300 p-[15px] pl-[100px] pr-[100px] rounded-2xl mt-[20px] bg-lime-500
 text-xl text-white'>Signup</button>
                </div>
                <h1>Already a user ? Sign In</h1>
                </div>
  
            </div>
            
           
        </form>
        </div>
      
       
    </div>
  )
}

export default SignupPage



//“Daily Needs. Multiple Vendors. One Platform.”