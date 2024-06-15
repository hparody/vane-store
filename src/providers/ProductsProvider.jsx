import PropTypes from "prop-types";
import { useMemo, useCallback, useState, useEffect } from "react";

import { ProductsContext } from "@/contexts";
import useApi from "@/hooks/useApi";
import useHttpAdapter from "@/hooks/useHttpAdapter";

import dummyProducts from "@/mocks/products.json";

const ProductsProvider = ({ children }) => {
  const { getRequest, postRequest, loading, error } = useApi();
  const { postRequest: postHttp } = useHttpAdapter();
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

  const createProduct = useCallback(
    async (productInfo) => {
      try {
        const response = await postRequest("/create/product");
        return { error: false, data: response };
      } catch (err) {
        console.error("Error cre products:", err);
        return { error: true, data: err };
      }
    },
    [postRequest]
  );

  const updateProduct = useCallback(
    async (productInfo) => {
      try {
        const response = await postHttp("/productos/actualizar");
        return { error: false, data: response };
      } catch (err) {
        console.error("Error cre products:", err);
        return { error: true, data: err };
      }
    },
    [postHttp]
  );

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({
      products,
      createProduct,
      updateProduct,
      fetchProducts,
      getProduct,
      loading,
      error,
    }),
    [
      createProduct,
      error,
      fetchProducts,
      getProduct,
      loading,
      products,
      updateProduct,
    ]
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
