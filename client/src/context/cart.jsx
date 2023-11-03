import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  // Function to clear all items from the cart
  // const clearCart = () => {
  //   setCart([]);
  //   localStorage.removeItem("cart"); // Optionally, remove the cart from localStorage as well
  // }; , clearCart

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  return { cart, setCart, clearCart };
};

export { useCart, CartProvider };
