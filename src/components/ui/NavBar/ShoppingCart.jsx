import { Fragment, useMemo, useState } from "react";
import {
  Button,
  Alert as Message,
  styled,
  Card as MuiCard,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Drawer from "@/components/ui/Drawer";
import useShoppingCart from "@/hooks/useShoppingCart";
import useProducts from "@/hooks/useProducts";
import useAlert from "@/hooks/useAlert";

const ProductCardShop = styled(MuiCard)`
  height: 160px;
  display: flex;
  flex-direction: row;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const ShoppingCart = (props) => {
  const { cartProducts, totalProducts, totalPrice, createOrder } =
    useShoppingCart();
  const { triggerAlert } = useAlert();
  const { getProduct } = useProducts();
  const [openShoppingCart, setOpenShoppingCart] = useState(false);

  const productsToShop = useMemo(
    () =>
      cartProducts.map(({ id, amount }) => ({ ...getProduct(id), id, amount })),
    [cartProducts, getProduct]
  );

  const handleCreateOrder = async () => {
    const { error, response } = await createOrder(cartProducts);
    if (error) {
      triggerAlert({ type: "error", message: "" });
    } else {
      triggerAlert({
        type: "success",
        message: `Orden creada exitosamente con id ${response.id}.`,
      });
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ShoppingCartIcon />}
        onClick={() => setOpenShoppingCart(true)}
        {...props}
      >
        {totalProducts}
      </Button>
      <Drawer
        title="Carrito de compras"
        anchor="right"
        openDrawer={openShoppingCart}
        onOpen={() => setOpenShoppingCart(true)}
        onClose={() => setOpenShoppingCart(false)}
      >
        <Grid container spacing={2}>
          {productsToShop.map((product) => (
            <Grid key={product.id} item xs={12}>
              <ProductCardShop>
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.image}
                  loading="lazy"
                  sx={{ width: "30%" }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    lineHeight="1"
                    marginBottom="4px"
                    component="div"
                  >
                    <b>{product.stock}</b> unidades disponibles
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    lineHeight={1.2}
                    gutterBottom
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight="bold"
                    component="div"
                    sx={{
                      lineHeight: "1",
                      width: "100%",
                      flex: 0.3,
                    }}
                  >
                    {`$ ${product.price}`}
                  </Typography>
                </CardContent>
              </ProductCardShop>
            </Grid>
          ))}
          {totalProducts !== 0 ? (
            <Fragment>
              <Grid item xs={12}>
                <Divider
                  variant="middle"
                  orientation="horizontal"
                  flexItem
                  sx={{ margin: "0px 20px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" lineHeight={1} gutterBottom>
                  Precio total: <b>$ {totalPrice}</b>
                </Typography>
                <Message variant="outlined" severity="info">
                  Por el momento solo contamos con pagos contraentrega. Su
                  pedido será enviado a la dirección ingresada al registrarse en
                  el sistema.
                </Message>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                  onClick={handleCreateOrder}
                >
                  Confirmar Pedido
                </Button>
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" lineHeight={1} gutterBottom>
                No tienes productos en tu carrito de compras.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Drawer>
    </Fragment>
  );
};

export default ShoppingCart;
