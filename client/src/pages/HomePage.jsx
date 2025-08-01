import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { baseURL } from '@/BaseUrl'
import { Link } from 'react-router-dom';  
import CategoryOnHomePage from './CategoryOnHomePage';
import Footer from '@/components/Footer';

function HomePage() {

  const [categoryData, setCategoryData] = useState([]);
  const [cartData, setCartData] = useState([]);

  async function fetchTheCart() {
    try {
      const res = await fetch(`${baseURL}api/get-cart`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setCartData(data.items);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch(`${baseURL}api/get-all-categories`);
      const data = await res.json();
      setCategoryData(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchTheCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <main className="flex-grow mr-[70px] ml-[180px]">
        

        <div>
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2160/layout-engine/2022-05/Group-33704.jpg" 
            className="w-[1300px] h-[250px]"
          />
        </div>

        <div className="flex flex-wrap w-max gap-6 ml-[16px] mt-[20px]">
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg" 
            className="w-[335px] h-[195px]" 
          />
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg" 
            className="w-[335px] h-[195px]" 
          />
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg" 
            className="w-[335px] h-[195px]" 
          />
        </div>


        <div className="ml-[10px] mt-[30px]">
          <div className="flex flex-wrap gap-4 mb-[30px]">
            {categoryData?.length > 0 &&
              categoryData.map((item) => (
                <Link to={`/category?category=${item.name}`} key={item.name}>
                  <div className="w-[128px] h-[188px]">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover rounded-md shadow-md" 
                    />
                  </div>
                </Link>
              ))
            }
          </div>
        </div>

        {/* Products by category */}
        <div className="mr-[50px]">
          <CategoryOnHomePage />
        </div>

        {/* Footer */}
        <div className="mt-[20px]">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default HomePage;
