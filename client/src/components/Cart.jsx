import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { baseURL } from "@/BaseUrl";

function Cart({ toggleCartSlider }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`${baseURL}api/get-cart`, {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setCartItems(data.items || []);
          const total = data.items.reduce((acc, item) => {
            return acc + item.quantity * item.productId.price;
          }, 0);
          setTotalAmount(total);
        }
      } catch (err) {
        console.log("Error fetching cart:", err);
      }
    }

    fetchCart();

    const interval = setInterval(fetchCart, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isCartEmpty = totalItems === 0;

  return (
    <div className="relative">
      <button
        onClick={toggleCartSlider} // ⬅️ Trigger the slider
        className={`flex items-center px-4 py-2 rounded-[6px] shadow-md transition-all duration-200 min-w-[160px] text-white text-left ${
          isCartEmpty ? 'bg-gray-300' : 'bg-[#1d9c3b]'
        }`}
      >
        <FiShoppingCart className="text-white text-xl mr-3" />

        {isCartEmpty ? (
          <span className="font-semibold text-base">My Cart</span>
        ) : (
          <div className="flex flex-col leading-tight text-sm font-semibold">
            <span>{totalItems} item{totalItems > 1 ? "s" : ""}</span>
            <span>₹{totalAmount}</span>
          </div>
        )}
      </button>
    </div>
  );
}

export default Cart;
