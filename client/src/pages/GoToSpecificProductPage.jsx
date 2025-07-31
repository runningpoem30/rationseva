import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '@/BaseUrl';

function GoToSpecificProductPage() {

    const [dataFromApi , setaDataFromApi] = useState()
 
    const {productId} = useParams();
    console.log(productId)

    async function getProductDetails(){
        const res = await fetch(`${baseURL}api/product/${productId}`)
        const data = await res.json()
        setaDataFromApi(data)
    }
console.log(dataFromApi);

    useEffect(() => {
        getProductDetails()
    } ,[])

  return (
    <div>
      this is specific product page niggu
    </div>
  )
}

export default GoToSpecificProductPage
