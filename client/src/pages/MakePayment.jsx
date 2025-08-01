import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function MakePayment() {
  useEffect(() => {
    async function placeOrder() {
      try {
        const res = await fetch("http://localhost:8000/api/place-order", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success) {
          toast.success("🎉 Order placed successfully!");
          setTimeout(() => {
            window.location.href = "/"; 
          }, 2000);
        } else {
          toast.error(data.message || "Failed to place order");
        }
      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Something went wrong");
      }
    }

    placeOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" />
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h1 className="text-xl font-bold mb-4">Placing your order...</h1>
        <p className="text-gray-500">Please wait while we confirm your order.</p>
      </div>
    </div>
  );
}

export default MakePayment;
