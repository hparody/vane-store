import { ShoppingCartContext } from "@/contexts";
import { useContext } from "react";

const useShoppingCart = () => useContext(ShoppingCartContext);

export default useShoppingCart;
