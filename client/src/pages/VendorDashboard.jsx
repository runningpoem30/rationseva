import React, { useEffect, useState } from 'react'
import VendorProduct from '@/components/VendorProduct'
import { baseURL } from '@/BaseUrl'
import { useNavigate } from 'react-router-dom'

function VendorDashboard() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await fetch(`${baseURL}api/view-all-vendor-products`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await result.json();
      setProductData(data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hi Vendor 👋</h1>
        <button
          className="bg-[#54B226] hover:bg-[#44941e] text-white px-5 py-2 rounded-md"
          onClick={() => navigate('/vendor/add-products')}
        >
          + Add Product
        </button>
      </div>

      {productData.length === 0 ? (
        <p className="text-gray-600 text-lg">No products found. Start by adding your first product!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData.map((item) => (
            <VendorProduct
              key={item._id}
              productId={item._id} // important for updating
              name={item.name}
              images={item.image?.[0]}
              discount={item.discount}
              description={item.description}
              stock={item.stock}
              unit={item.unit}
              createdBy={item.createdBy.shopName}
              category={item.category?.name}
              price={item.price}
              refresh={getData} // pass to child if you want to re-fetch after update
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;
