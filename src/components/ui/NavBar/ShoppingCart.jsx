import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useShoppingCart from "@/hooks/useShoppingCart";

const ShoppingCart = (props) => {
  const { totalProducts } = useShoppingCart();

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<ShoppingCartIcon />}
      {...props}
    >
      {totalProducts}
    </Button>
  );
};

export default ShoppingCart;
