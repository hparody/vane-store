import { useState } from "react";
import { ShoppingCartContext } from "@/contexts";

const ShoppingCartProvider = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (product) => {
    setCartProducts([...cartProducts, product]);
  };

  const contextValue = {
    addProductToCart,
    cartProducts,
    totalProducts: cartProducts.length,
  };

  return (
    <ShoppingCartContext.Provider
      value={contextValue}
    ></ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
