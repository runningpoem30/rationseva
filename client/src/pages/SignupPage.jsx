import React, { useState } from 'react'
import useFetch from '../hooks/UseFetch'


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
    }

  return (
    <div>
        <h1>signup page</h1>
        <div>
        <form onSubmit={handleSubmit}>
            <input name="name"value={formData.name} onChange={handleChange} placeholder='enter your name'></input>
            <input name="email"value={formData.email} onChange={handleChange} placeholder='enter your email'></input>
            <input  name="password" value={formData.password} onChange={handleChange} placeholder='enter your password'></input>
            <button>Submit button</button>
        </form>
        </div>
      
       
    </div>
  )
}

export default SignupPage



//“Daily Needs. Multiple Vendors. One Platform.”