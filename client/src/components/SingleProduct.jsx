import React from 'react'

function SingleProduct({name, unit , price , image}) {
  return (
    <div>
        <div className='border border-grey-700 h-[300px] w-[188px] rounded-[10px]  hover:shadow-md cursor-pointer bg-white'> 
        <div>
            <img className="w-[200px] h-[200px] p-[15px]" src={image}/>
        </div>
        <div>
          
  <h4 className='pl-[14px] text-[13px] font-semibold text-black line-clamp-2 leading-snug'>{name}</h4>
            <h2 className='text-[#696969] font-medium line-clamp-1 pl-[14px] text-[12px]'>{unit}</h2>
           <div className='flex gap-[74px] items-center'>
  <div>
    <h2 className='pl-[14px] text-black font-semibold text-[12px] h-[20px] flex items-center'>
      ₹{price}
    </h2>
  </div>

  <div>
    <button className="text-[#318616] border border-[#318616] rounded-[5px] px-4 py-1 text-sm font-medium">
      ADD
    </button>
  </div>
</div>

  

        </div>
        </div>


        

    </div>
  )
}

export default SingleProduct
