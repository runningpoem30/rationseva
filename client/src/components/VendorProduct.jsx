import React from 'react'


function VendorProduct({name, unit , stock , discount , description , category, images , createdBy}) {

    
  return (
    <div className='border border-grey-500 '>
      This is the Product Card which is added by the Vendor
      <div className='bg-white shadow-md rounded-lg p-4 w-[400px] h-[600px]'>
        <div>
        <h1 className='w-[100px]' className='text-4xl font-bold text-[#54B226]'>Name</h1>
              </div>
      <div> 
         <img src="/Slice-2_10.png" className='p-[50px]' />
     </div> 
     <div>
      <h1>Add Unit</h1>
      <h1>Discount</h1>
      <h1>Description</h1>
      <h1>Category</h1>
      <h1>Created By</h1>
      <h1>Stock</h1>
     </div>
      
      </div>
     
    </div>
  )
}

export default VendorProduct
