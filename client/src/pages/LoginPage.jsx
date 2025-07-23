import React, { useState } from 'react'
import CommonComponentLanding from '@/components/CommonComponentLanding'
import { Link } from 'react-router-dom'

function LoginPage() {

    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    function handleChange(event){
        setFormData({
            ...setFormData,
            [event.target.name] : event.target.value
        })
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const fetchApi = await fetch("http://localhost:8000/api/user/login" , {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })

            const result = await fetchApi.json()
            console.log("response" , result)
        }
        catch(err){
            console.log(err)
        }

        setFormData({
            email : "",
            password : ""
        })
    }

  return (
    <div>
     
        <div className='flex flex-row'>
            <CommonComponentLanding/>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 items-center justify-center h-screen ">
                <div className='space-y-9 ml-[300px]'>
                <h1 className='text-5xl font-bold text-gray-800'>Log in to RationSeva</h1>
                <div className='ml-[80px] space-y-4'>
                <div>
                    <input  className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]'name="email"value={formData.email} onChange={handleChange} placeholder='Email'></input>
                </div>
                <div>
                    <input  className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 pr-[100px]' name="password" value={formData.password} onChange={handleChange} placeholder='Password'></input>
                </div>
                <div>
                    <button   className='border border-gray-300 p-[15px] pl-[100px] pr-[100px] rounded-2xl mt-[20px] bg-[#F8CB46] ml-[40px]
 text-xl text-white'>Log in</button>
                </div>
                <div className='ml-[15px]'>
                    <h1 className="ml-[70px] text-sm">
                    New User?{' '}
                    <Link to="/signup" className="text-green-600 underline hover:text-green-800 cursor-pointer">
                        Sign up
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

export default LoginPage



