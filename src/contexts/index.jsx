import { createContext } from "react";

const initialProductsState = {
  products: null,
  fetchProducts: null,
  getProduct: null,
  loading: false,
  error: false,
};

const ProductsContext = createContext(initialProductsState);

const initialAuthState = {
  user: null,
  error: false,
  isAdmin: false,
  isLoggedIn: false,
  loading: false,
  login: null,
  logout: null,
};

const AuthContext = createContext(initialAuthState);

export { AuthContext, ProductsContext };
