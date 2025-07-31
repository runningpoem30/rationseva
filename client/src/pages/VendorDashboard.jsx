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
   
    }
    catch(err){
        console.log(err)
    }
   }

    console.log(productData)

   useEffect(() => {
        getData()
   }, [])
  return (
    <div className='flex flex-wrap gap-4'>
  {
    productData && productData.length > 0 && productData.map((item) => (
      <VendorProduct
        key={item._id}
        name={item.name}
        images={item.image?.[0]}
        discount={item.discount}
        description={item.description}
        stock={item.stock}
        unit={item.unit}
        createdBy={item.createdBy.shopName}
        category={item.category?.name}
        price={item.price}
      />
    ))
  }
</div>
  )
}

export default VendorDashboard
