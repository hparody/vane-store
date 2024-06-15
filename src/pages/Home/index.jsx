import useProducts from "@/hooks/useProducts";
import {
  Box,
  Grid,
  Skeleton,
  Card as MuiCard,
  CardMedia,
  CardContent as MuiCardContent,
  Button,
  Typography,
  styled,
  cardMediaClasses,
  cardContentClasses,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useShoppingCart from "@/hooks/useShoppingCart";

import DefaultProductImage from "@/assets/default-image.jpg";

const LoadingProductsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(6)).map((_, idx) => (
        <Grid key={`skeleton-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Skeleton variant="rounded" animation="wave" height={300} />
        </Grid>
      ))}
    </Grid>
  );
};

const CardHiddenDetails = styled(Box)`
  transform: scale(0);
  opacity: 0%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CardContent = styled(MuiCardContent)`
  height: 35%;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all ease-in-out 300ms;
  box-sizing: border-box;
`;

const Card = styled(MuiCard)`
  max-width: 345;
  height: 400px;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  transition: all ease-in-out 200ms;

  &:hover {
    transform: scale(1.02);
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
    z-index: 500;

    .${cardMediaClasses.root} {
      height: 40%;
    }

    .${cardContentClasses.root} {
      height: 60%;
    }

    .hiddenDetails {
      opacity: 100%;
      transform: scale(1);
      transition: all ease-in-out 500ms;
    }
  }
`;

const Home = () => {
  const { products, loading } = useProducts();
  const { addProductToCart, removeProductFromCart } = useShoppingCart();
  if (loading) return <LoadingProductsSkeleton />;
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image === "" ? DefaultProductImage : product.image}
              loading="lazy"
              sx={{ height: "65%", transition: "all ease-in-out 500ms" }}
            />
            <CardContent sx={{ height: "35%", position: "relative" }}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                  gutterBottom
                  variant="body1"
                  fontWeight="600"
                  component="div"
                  sx={{ lineHeight: "1.2", width: "100%" }}
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
              </Box>
              <CardHiddenDetails component="div" className="hiddenDetails">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: "1.2" }}
                  component="div"
                  fontWeight="bold"
                >
                  Descripción
                </Typography>
                <Typography
                  variant="caption"
                  gutterBottom
                  color="text.secondary"
                  sx={{
                    lineHeight: "1.2",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  component="div"
                >
                  {product.description}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  disabled={product.stock === 0}
                  startIcon={<AddShoppingCartIcon />}
                  sx={{ width: "100%", marginTop: "auto" }}
                  onClick={() => addProductToCart(product.id)}
                >
                  Añadir al carrito
                </Button>
              </CardHiddenDetails>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
