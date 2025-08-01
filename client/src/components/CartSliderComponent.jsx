// CartSlider.jsx
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { baseURL } from "@/BaseUrl";

export default function CartSlider({isOpen , setIsOpen}) {

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${baseURL}api/get-cart`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.items || []);
        const total = data.items.reduce(
          (acc, item) => acc + item.quantity * item.productId.price,
          0
        );
        setTotalAmount(total);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryCharge = totalAmount >= 200 ? 0 : 30;
  const amountToFreeDelivery = 200 - totalAmount;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-900 px-4 py-2 text-white rounded-md flex items-center gap-2"
        >
          <FiShoppingCart />
          {totalItems > 0 ? (
            <span>
              {totalItems} item{totalItems > 1 ? "s" : ""} | ₹{totalAmount}
            </span>
          ) : (
            <span>My Cart</span>
          )}
        </button>
      </div>

      {/* Cart Slider */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">My Cart</h2>
          <IoMdClose
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border p-2 rounded-md shadow-sm"
            >
              <div className="flex gap-3">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {item.productId.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.productId.unit}
                  </p>
                  <p className="font-semibold">₹{item.productId.price}</p>
                </div>
              </div>
              <div className="bg-green-700 rounded-md text-white flex items-center px-2 py-1 gap-2">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div className="text-sm mb-2">
            <div className="flex justify-between">
              <span>Items total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery charge</span>
              <span>
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}{" "}
              </span>
            </div>
            {deliveryCharge > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Add ₹{amountToFreeDelivery} more for free delivery
              </div>
            )}
            <div className="flex justify-between font-semibold mt-2">
              <span>Grand Total</span>
              <span>₹{totalAmount + deliveryCharge}</span>
            </div>
          </div>
          <button className="w-full bg-green-700 text-white py-2 rounded-md text-center mt-2">
            Proceed
          </button>
        </div>
      </div>
    </>
  );
}
