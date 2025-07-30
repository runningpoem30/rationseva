import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { baseURL } from '@/BaseUrl';
import { AddressAutofill  } from '@mapbox/search-js-react';
import Address from '@/components/Address';
import { useJsApiLoader , Autocomplete, Data } from '@react-google-maps/api';
const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
import toast , {Toaster} from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


function AddAdressPage() {
    const [formData, setFormData] = useState({
        addressLine : "",
        city : "",
        state :"",
        pincode : "",
        mobile : ""
    })


const [role , setRole] = useState();
const navigate = useNavigate()


 
   async function getCookie(){
    try{
        const res = await fetch(`${baseURL}api/whoami`,{
          credentials : 'include'
        })
        const data = await res.json()
        setRole(data?.role)
    }
        catch(err){
          console.log(err)
        }
   }
   console.log(role)

function goToHome(){
    role === 'vendor' ? navigate('/vendor-dashboard') : navigate('/home')
}


   useEffect(() => {
      getCookie()
   },[])

   async function handleSubmit(event){
        event.preventDefault();

        if(!role){
          console.log("user is not authenticated")
          return;
        }

        const endpoint = role === 'vendor' ? `${baseURL}api/vendor/add-address` : `${baseURL}api/user/add-address`
        try{

             const res = await fetch(endpoint , {
              method : 'POST',
              headers : {
                "Content-Type" : "application/json",
              },
              body : JSON.stringify(formData),
              credentials : 'include'
             })

             const data = await res.json()
             console.log(data)
             if(data.success){
              toast.success(data.message)
              setFormData({
                addressLine :"",
                city:"",
                state:"",
                pincode:"",
                mobile:""
              })
              setTimeout(() => {
                 goToHome()
              }, 2000);
             
             }
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

    
     

  return (
    <div>
      <Toaster position='top-center'/>
        <div>
            <span className='text-5xl font-bold text-[#F8CB46]'>Ration</span>
            <span className='text-5xl font-bold text-[#54B226]'>Seva</span>
        </div>

      <div>
        <div>

           <form onSubmit={handleSubmit} className='ml-[400px] mt-[100px]'>
            <AddressAutofill accessToken ={mapboxToken}>
              <div className='flex flex-col gap-y-[4px] mt-[90px]'>
                 <div>
                   <input className='border border-gray-300 p-[15px] rounded-2xl bg-gray-100 w-[280px]' name='addressLine' placeholder='Address Line' value={formData.addressLine} onChange={handleClick}></input>
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
            </AddressAutofill>
               
              </form>
        </div>

      </div>
    </div>
  )
}

export default AddAdressPage




//GOOGLE CLOUDE API =AIzaSyCt_LrEzpCy-cqn1hBmD_3wJxd5LdF6A-g
//AIzaSyCt_LrEzpCy-cqn1hBmD_3wJxd5LdF6A-g


