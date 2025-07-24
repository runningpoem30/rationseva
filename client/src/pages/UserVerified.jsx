import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UserVerified() {
    const {userId , token} = useParams()
    const navigate = useNavigate()

    console.log('userid' , userId)
    console.log('token' , token)

    function goLoginPage(){
        navigate('/login')
    }

    async function verifyUser () {
        try{
            const res = await fetch(`http://localhost:8000/api/user/verify/${userId}/${token}`)
            const data = await res.json()

            if(data.success === true){
                toast.success("User Successfully verified , Taking you to Home Page")
                setTimeout(() => {
                    goLoginPage()
                }, (2000));
            }
            else{
                toast.error("error verifying user")
            }
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        verifyUser()
    } ,[])
  return (
    <div>
       <Toaster position='top-center'/> 
       
    </div>
  )
}

export default UserVerified



// http://localhost:8000/api/user/verify/688006d6fde5d6df1b4928ab/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODgwMDZkNmZkZTVkNmRmMWI0OTI4YWIiLCJpYXQiOjE3NTMyMjA4MjMsImV4cCI6MTc1MzIyMTcyM30.aivIBqU0rH3S2au9pQbYdyadsrCR-Nn2eotn_tJTN5g

