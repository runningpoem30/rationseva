import React from 'react'


function VendorProduct({name, unit , stock , discount , description , category, images , createdBy}) 
{

    
  return (
    <div className=''>
      <div className='bg-black-500 shadow-md rounded-lg p-4 w-[400px]'>
        <div>
        <h1 className='w-[100px]' className='text-4xl font-bold text-[#54B226]'>{name}</h1>
              </div>
      <div className=' border  rounded-[10px]'> 
         <img src={images} className='' />
     </div> 
     <div>
      <h1>Price : {unit}</h1>
      <h1>Discount : {discount}</h1>
      <h1>Description : {description}</h1>
      <h1>Category : {category}</h1>
      <h1>Stock : {stock}</h1>
      <h1 className='text-[#54B226] font-bold'>Created by {createdBy}</h1>
     </div>
      </div>
     
    </div>
  )
}

export default VendorProduct
