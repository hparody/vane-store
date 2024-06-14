import { useState } from "react";
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

  const handleOpenProductForm = (state) => {
    setOpenProductForm(state);
  };

  const handleAddingProduct = () => {
    setAction(ACTION_CREATE);
    handleOpenProductForm(true);
  };

  const onEditProduct = (productId) => {
    console.log("Edit", getProduct(productId));
    setAction(ACTION_EDIT);
    setSelectedProduct(getProduct(productId));
    handleOpenProductForm(true);
  };

  const onDeleteProduct = (productId) => {
    console.log("Delete", productId);
    setAction(ACTION_DELETE);
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
        onOpenForm={() => handleOpenProductForm(true)}
        onCloseForm={() => handleOpenProductForm(false)}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Products;
