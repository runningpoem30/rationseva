import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { baseURL } from '@/BaseUrl';

function GoToCategory() {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    console.log(category)

    async function goToCategoryPage(){
        try{
            const res = await fetch(`${baseURL}api/view-all-products?category=${category}`, {
                method : "GET",
                credentials : "include"
            })

            const data = await res.json()
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
            goToCategoryPage();
    } , [])

  return (
    <div>
        <h1>
            
        </h1>
      
    </div>
  )
}

export default GoToCategory
