import React, { useEffect, useState } from 'react';
import { baseURL } from '@/BaseUrl';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`${baseURL}api/get-cart`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        console.log(data.items)
        if (data.success) {
          setCartItems(data.items || []);
          const total = data.items.reduce((acc, item) => {
            return acc + item.quantity * item.productId.price;
          }, 0);
          setTotalAmount(total);
        } else {
          toast.error(data.message || 'Please login first');
        }
      } catch (err) {
        console.log("Cart fetch error:", err);
        toast.error("Something went wrong!");
      }
    }

    fetchCart();
  }, []);


  return (
    <div>
        <Header/>
            <div className="min-h-screen bg-gray-100 px-6 pt-6 pb-24 relative">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6 text-[#1d9c3b]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-36">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.productId.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.productId.price} × {item.quantity}
                  </p>
                </div>
                <div className="text-lg font-bold text-[#54B226]">
                  ₹{item.productId.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t shadow-xl flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>
            <Link to='/make-payment'>
            <button className="bg-[#54B226] text-white px-6 py-3 rounded-lg hover:bg-[#3d8f1d] transition">
              Make Payment
            </button></Link>
            
          </div>
        </>
      )}
    </div>
    </div>
    
  );
}

export default CartPage;
