import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { baseURL } from '@/BaseUrl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddToCart from '@/components/AddToCart';


function GoToSpecificProductPage() {
  
  const [dataFromApi, setDataFromApi] = useState();
  const [selectedImage, setSelectedImage] = useState(null); // ⭐️ for main image

  const { productId } = useParams();

  async function getProductDetails() {
    const res = await fetch(`${baseURL}api/product/${productId}`);
    const data = await res.json();
    setDataFromApi(data.data);
    setSelectedImage(data.data.image[0][0]); // ⭐️ set the default main image
  }


  //console.log(dataFromApi)

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleClick = (url) => {
    setSelectedImage(url); // ⭐️ update main image on click
  };

  return (
    <div>
      <Header />

<div className='ml-[140px]'>
<div className='flex'>
     <div className="p-8">
        {selectedImage && (
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Selected product"
              className="w-[700px] h-[500px] object-cover border border-gray-300 rounded-xl mx-auto"
            />
          </div>
        )}
        <div className="flex gap-4 justify-center">
          {dataFromApi?.image?.[0]?.map((url, index) => (
            <div key={index} onClick={() => handleClick(url)} className="cursor-pointer">
              <img
                src={url}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-md border-2 ${
                  selectedImage === url ? 'border-green-600' : 'border-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
        <h1 className='mt-[50px] text-black-700 font-extrabold text-[20px]'>Description</h1>
        <div>{dataFromApi?.description}</div>
        {/* <h1>{dataFromApi.createdBy.name}</h1> */}
      </div>
      <div className='ml-[350px] mt-[60px]'>
        <div>
        <h1 className='text-black-700 font-extrabold text-[20px]'>{dataFromApi?.name}</h1>
      </div>
      <h1 className='text-[#696969]'>{dataFromApi?.unit}</h1>
      <div className='flex gap-[500px] mt-[5px]'>
             <h1 className='mt-[20px]'>₹{dataFromApi?.price}</h1>
       <AddToCart productId={dataFromApi?._id}/>
      </div>
     
      
      
      <div className='flex gap-[400px]'>
          <p>(Inclusive of all taxes)</p>
     
      </div>
      
    

      
      <div className='mt-[30px] w-[800px]'>
        <img src='https://i.ibb.co/rK68Nn9Z/Screenshot-2025-08-01-at-6-41-20-AM.png'></img>
      </div>
      
      </div>
      
</div>
</div>

 <Footer/>
    </div>
  );
}

export default GoToSpecificProductPage;
