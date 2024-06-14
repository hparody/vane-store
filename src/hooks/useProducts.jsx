import { ProductsContext } from "@/contexts";
import { useContext } from "react";

const useProducts = () => useContext(ProductsContext);

export default useProducts;
