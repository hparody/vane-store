import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { ACTION_CREATE, ACTION_EDIT, ACTION_DELETE } from "@/constants/actions";
import useProducts from "@/hooks/useProducts";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const { products, loading, fetchProducts, getProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openProductForm, setOpenProductForm] = useState(false);
  const [action, setAction] = useState(ACTION_CREATE);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddingProduct = () => {
    setAction(ACTION_CREATE);
    setOpenProductForm(true);
  };

  const onEditProduct = (productId) => {
    console.log("Edit", getProduct(productId));
    setAction(ACTION_EDIT);
    setSelectedProduct(getProduct(productId));
    setOpenProductForm(true);
  };

  const onDeleteProduct = (productId) => {
    setAction(ACTION_DELETE);
    console.log("Delete", productId);
    /** LOGIC TO DELETE */
    fetchProducts(); // Fetch new products after the deletion
  };

  const handleCloseProductForm = () => {
    setOpenProductForm(false);
    setSelectedProduct(null);
    setAction(ACTION_CREATE);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight="bold">
            Productos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={handleAddingProduct}
          >
            Añadir nuevo Producto
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ProductsTable
            products={products}
            loadingProducts={loading}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        </Grid>
      </Grid>
      <ProductForm
        openForm={openProductForm}
        action={action}
        onOpenForm={() => setOpenProductForm(true)}
        onCloseForm={handleCloseProductForm}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Products;
