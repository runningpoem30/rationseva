import React from 'react'


function VendorProduct({name, unit , stock , discount , description , category, images , createdBy}) 
{

    
  return (
    <div className='border border-grey-500 '>
      This is the Product Card which is added by the Vendor
      <div className='bg-white shadow-md rounded-lg p-4 w-[400px] h-[600px]'>
        <div>
        <h1 className='w-[100px]' className='text-4xl font-bold text-[#54B226]'>{name}</h1>
              </div>
      <div> 
         <img src={images} className='p-[50px]' />
     </div> 
     <div>
      <h1>{unit}</h1>
      <h1>{discount}</h1>
      <h1>{description}</h1>
      <h1>{category}</h1>
      <h1>{stock}</h1>
      <h1>{createdBy}</h1>
     </div>
      </div>
     
    </div>
  )
}

export default VendorProduct
