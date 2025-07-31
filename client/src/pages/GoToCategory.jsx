import React, { useEffect, useState } from 'react'
import { data, useLocation } from 'react-router-dom'
import { baseURL } from '@/BaseUrl';
import SingleProduct from '@/components/SingleProduct';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

function GoToCategory() {

    const [dataFromApi , setaDataFromApi] = useState()
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
            setaDataFromApi(data)
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(dataFromApi)

    useEffect(() => {
            goToCategoryPage();
    } , [])

 return (
  <div>
    <div>
        <Header/>
    </div>
    <div className=''>
     <div className='ml-[233px] font-semibold text-black border border-grey-100 w-[1200px] pl-[2px] py-[6px] text-[14px]'>Buy {category} Online</div>
    <div className='max-w-[1200px] mx-auto bg-gray-100 border border-grey-100'>

     <div className='grid grid-cols-6  gap-y-[10px] mt-[5px]'>
      {dataFromApi?.length > 0 ? (
        dataFromApi.map((item) => (
            <Link to={`/product/${item._id}`}>
            <div className='ml-[9px]'><SingleProduct name={item.name} price={item.price}  unit={item.unit} image={item.image[0][0]}/></div></Link>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>

    </div>
    </div>


  </div>
);

}
export default GoToCategory;
