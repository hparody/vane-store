import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { ShoppingCartContext } from "@/contexts";
import useLocalStorage from "@/hooks/useLocalStorage";

const ShoppingCartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage("shopping-cart", []);

  const addProductToCart = useCallback(
    (productId) => {
      let newProducts = [];
      if (cartProducts.some((cartProduct) => cartProduct.id === productId)) {
        newProducts = cartProducts.map(({ id, amount }) =>
          id === productId ? { id, amount: amount + 1 } : { id, amount }
        );
      } else {
        newProducts = [...cartProducts, { id: productId, amount: 1 }];
      }
      setCartProducts(newProducts);
    },
    [cartProducts, setCartProducts]
  );

  const removeProductFromCart = useCallback(
    (productId) => {
      setCartProducts([
        ...cartProducts.filter((product) => product.id !== productId),
      ]);
    },
    [cartProducts, setCartProducts]
  );

  const contextValue = useMemo(
    () => ({
      addProductToCart,
      removeProductFromCart,
      cartProducts,
      totalProducts: cartProducts.reduce((sum, { amount }) => sum + amount, 0),
      totalPrice: cartProducts.reduce(
        (sum, { amount, price }) => sum + amount * price,
        0
      ),
    }),
    [addProductToCart, cartProducts, removeProductFromCart]
  );

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShoppingCartProvider;
