import PropTypes from "prop-types";

import { useCallback, useMemo } from "react";
import { ShoppingCartContext } from "@/contexts";
import useProducts from "@/hooks/useProducts";
import useApi from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import useAuth from "@/hooks/useAuth";

const ShoppingCartProvider = ({ children }) => {
  const { getProduct } = useProducts();
  const { postRequest } = useApi();
  const [cartProducts, setCartProducts] = useLocalStorage("shopping-cart", []);
  const { user } = useAuth();

  const createOrder = useCallback(
    async (products) => {
      try {
        const response = await postRequest("/create/order", {
          products,
          vnuser: user.email,
          date: new Date().toISOString().split("T")[0],
        });

        return { error: false, data: response };
      } catch (error) {
        // SET DUMMY USER
        console.error(error);
        return { error: true, data: error };
      }
    },
    [postRequest, user]
  );

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

  const totalPrice = useMemo(
    () =>
      cartProducts
        .map(({ id, amount }) => ({
          ...getProduct(id),
          amount,
        }))
        .reduce((sum, { amount, price }) => sum + amount * price, 0),
    [cartProducts, getProduct]
  );

  const contextValue = useMemo(
    () => ({
      addProductToCart,
      removeProductFromCart,
      cartProducts,
      totalProducts: cartProducts.reduce((sum, { amount }) => sum + amount, 0),
      totalPrice,
      createOrder,
    }),
    [
      addProductToCart,
      cartProducts,
      createOrder,
      removeProductFromCart,
      totalPrice,
    ]
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
