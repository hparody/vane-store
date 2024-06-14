import PropTypes from "prop-types";
import { useMemo, useCallback, useState, useEffect } from "react";

import { ProductsContext } from "@/contexts";
import useApi from "@/hooks/useApi";

import dummyProducts from "@/mocks/products.json";

const ProductsProvider = ({ children }) => {
  const { getRequest, loading, error } = useApi();
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getRequest("/get/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts(dummyProducts);
    }
  }, [getRequest]);

  const getProduct = useCallback(
    (productId) => {
      return products.find((product) => product.id === productId);
    },
    [products]
  );

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({ products, fetchProducts, getProduct, loading, error }),
    [error, fetchProducts, getProduct, loading, products]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
