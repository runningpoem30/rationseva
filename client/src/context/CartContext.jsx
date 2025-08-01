import { createContext, useContext, useEffect, useState } from 'react';
import { baseURL } from '@/BaseUrl';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  async function getCartDetails() {
    try {
      const res = await fetch(`${baseURL}api/view-all-products`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (data?.success && data?.items) {
        setCartItems(data.items);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  function handleAddToCart(){

  }


  return (
    <CartContext.Provider value={{ cartItems, setCartItems , handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
