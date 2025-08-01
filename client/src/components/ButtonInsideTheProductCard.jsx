import React, { useEffect } from 'react'
import { baseURL } from '@/BaseUrl'

function ButtonInsideTheProductCard({productId}) {

    async function getTheCardDetails(){
        try{
            const res = await fetch(`${baseURL}api/get-cart`,{
                method : 'GET',
                credentials : 'include'
            })
            const data = await res.json()
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getTheCardDetails()
    }, [])

  return (
    <div>
    <button className="text-[#318616] border border-[#318616] rounded-[5px] px-4 py-1 text-sm font-medium">
      ADD
    </button>
    </div>
  )
}

export default ButtonInsideTheProductCard
