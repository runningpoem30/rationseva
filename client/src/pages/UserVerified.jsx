import React from 'react'
import { useParams } from 'react-router-dom'

function UserVerified() {
    const {userId , token} = useParams()

    console.log('userid' , userId)
    console.log('token' , token)

  return (
    <div>
      user is verified , please proceed
    </div>
  )
}

export default UserVerified




// http://localhost:8000/api/user/verify/688006d6fde5d6df1b4928ab/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODgwMDZkNmZkZTVkNmRmMWI0OTI4YWIiLCJpYXQiOjE3NTMyMjA4MjMsImV4cCI6MTc1MzIyMTcyM30.aivIBqU0rH3S2au9pQbYdyadsrCR-Nn2eotn_tJTN5g

