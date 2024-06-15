import { useCallback, useState, useMemo } from "react";
import { ShoppingCartContext } from "@/contexts";

const ShoppingCartProvider = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = useCallback(
    (productId) => {
      let newProducts = [];
      if (cartProducts.some((cartProduct) => cartProduct.id === productId)) {
        newProducts = cartProducts.map(({ id, amount }) =>
          id === productId ? { id, amount: amount++ } : { id, amount }
        );
      } else {
        newProducts = [...cartProducts, { id: productId, amount: 1 }];
      }
      setCartProducts(newProducts);
    },
    [cartProducts]
  );

  const removeProductFromCart = useCallback(
    (productId) => {
      setCartProducts([
        ...cartProducts.filter((product) => product.id !== productId),
      ]);
    },
    [cartProducts]
  );

  const contextValue = useMemo(
    () => ({
      addProductToCart,
      removeProductFromCart,
      cartProducts,
      totalProducts: cartProducts.length,
    }),
    [addProductToCart, cartProducts, removeProductFromCart]
  );

  return (
    <ShoppingCartContext.Provider
      value={contextValue}
    ></ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
