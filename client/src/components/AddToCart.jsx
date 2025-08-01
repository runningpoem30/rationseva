import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { baseURL } from '@/BaseUrl';

function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(0);

  // Fetch cart items when component mounts
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`${baseURL}api/get-cart`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          const item = data.cart.items.find(item => item.productId._id === productId);
          if (item) {
            setQuantity(item.quantity);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCart();
  }, [productId]);

  // Common function for both +1 and -1
  async function updateCart(change) {
    try {
      const res = await fetch(`${baseURL}api/add-items-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: productId,
          quantity: change
        })
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setQuantity(prev => prev + change);
      } else {
        toast.error(data.message || "Error updating cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='relative flex items-center gap-2'>
      <Toaster position='top-center' />

      {quantity === 0 ? (
        <button
          onClick={() => updateCart(1)}
          className="px-4 py-2 rounded bg-[#54B226] text-white font-bold"
        >
          Add To Cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateCart(-1)}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() => updateCart(1)}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default AddToCart;
