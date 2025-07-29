import React, { useEffect, useState } from 'react'
import VendorProduct from '@/components/VendorProduct'
import { baseURL } from '@/BaseUrl'

function VendorDashboard() {
    const [productData , setProductData] = useState();


   async function getData(){
    try{
     const result = await fetch(`${baseURL}api/view-all-vendor-products`,{
        method : 'GET',
        credentials : 'include'
     });
    const data = await result.json();
    setProductData(data.data)
    console.log(productData)
    }
    catch(err){
        console.log(err)
    }
   }

   useEffect(() => {
        getData()
   }, [])
  return (
    <div className='flex flex-row'>
      {
         productData && productData.length > 0 ? <div>
           {
            productData.map((item) => <div className='flex'><VendorProduct name={item.name} images={item.image} discount={item.discount} description={item.description} stock={item.stock} unit={item.unit}></VendorProduct></div>)
           }
        </div>  : null
      }
    </div>
  )
}

export default VendorDashboard
