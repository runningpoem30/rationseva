import React, { useEffect, useState } from 'react';
import { baseURL } from '@/BaseUrl';
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';

function CategoryWiseDataOnHomePage({ category }) {
  const [dataFromApi, setaDataFromApi] = useState();

  async function getData() {
    const res = await fetch(`${baseURL}api/view-all-products?category=${category}`);
    const data = await res.json();
    setaDataFromApi(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-[1300px]'>
      <div className='flex gap-[1000px]'>
        <div className='mb-[20px]'>
          <h1 className='ml-[8px] text-[22px] font-semibold text-[#1C1C1C]'>{category}</h1>
        </div>
        <div>
          <Link to={`/category?category=${category}`}>
            <h1 className='mt-[9px] text-[#54B226] text-[22px] font-semi-bold'>see all</h1>
          </Link>
        </div>
      </div>

      <div className='relative flex item-center'>
        <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {dataFromApi && dataFromApi.length > 0 ? (
            dataFromApi.map((item) => (
              <div className='inline-block ml-[17px] mb-[20px]' key={item._id}>
                <SingleProduct
                  _id={item._id}
                  name={item.name}
                  unit={item.unit}
                  price={item.price}
                  image={item.image[0][0]}
                />
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CategoryWiseDataOnHomePage;
