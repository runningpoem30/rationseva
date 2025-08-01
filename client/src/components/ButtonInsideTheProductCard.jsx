import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { baseURL } from '@/BaseUrl';

function ButtonInsideTheProductCard({ productId }) {
  const [quantity, setQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume logged in by default

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`${baseURL}api/get-cart`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        if (!data.success) {
          setIsLoggedIn(false); // Not logged in or error
          return;
        }

        setIsLoggedIn(true); // Logged in
        const item = data.items.find(
          (item) => item?.productId?._id === productId
        );
        if (item) {
          setQuantity(item.quantity);
        }
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false); // Catch network/auth errors
      }
    }

    fetchCart();
  }, [productId]);

  async function updateCart(change) {
    if (!isLoggedIn) {
      toast.error('Please login first to add items to your cart.');
      return;
    }

    try {
      const res = await fetch(`${baseURL}api/add-items-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          productId,
          quantity: change,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setQuantity((prev) => prev + change);
      } else {
        toast.error(data.message || 'Error updating cart');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Try again later.');
    }
  }

  return (
    <div className="mt-2 w-full flex justify-center">
      <Toaster position="top-center" />
      {!isLoggedIn ? (
        <button
          onClick={() => toast.error('Please login first to add to cart.')}
          className="text-[#318616] border border-[#318616] rounded px-4 py-[2px] text-sm font-semibold w-[70px] h-[30px] flex items-center justify-center"
        >
          ADD
        </button>
      ) : quantity === 0 ? (
        <button
          onClick={() => updateCart(1)}
          className="text-[#318616] border border-[#318616] rounded px-4 py-[2px] text-sm font-semibold w-[70px] h-[30px] flex items-center justify-center"
        >
          ADD
        </button>
      ) : (
        <div className="text-[#318616] border border-[#318616] rounded w-[70px] h-[30px] flex items-center justify-between px-2 text-sm font-semibold">
          <button
            onClick={() => updateCart(-1)}
            className="text-[#318616] font-bold"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => updateCart(1)}
            className="text-[#318616] font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ButtonInsideTheProductCard;
