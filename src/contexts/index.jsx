import { createContext } from "react";

const initialProducts = {
  products: null,
  fetchProducts: null,
  getProduct: null,
  loading: false,
  error: false,
};

const ProductsContext = createContext(initialProducts);

const initialAuth = {
  user: null,
  error: false,
  isAdmin: false,
  isLoggedIn: false,
  loading: false,
  login: null,
  logout: null,
};

const AuthContext = createContext(initialAuth);

const initialShoppingCart = {
  cartProducts: [],
  totalProducts: 0,
  addProductToCart: null,
  removeProductFromCart: null,
};

const ShoppingCartContext = createContext(initialShoppingCart);

export { AuthContext, ProductsContext, ShoppingCartContext };
