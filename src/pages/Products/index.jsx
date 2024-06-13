import { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { ACTION_CREATE, ACTION_EDIT, ACTION_DELETE } from "@/constants/actions";
import ProductForm from "./ProductForm";

const Products = () => {
  const [openProductForm, setOpenProductForm] = useState(false);
  const [action, setAction] = useState(ACTION_CREATE);

  const handleOpenProductForm = (state) => {
    setOpenProductForm(state);
  };

  const handleAddingProduct = () => {
    setAction(ACTION_CREATE);
    handleOpenProductForm(true);
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
        <Grid item xs={12}></Grid>
      </Grid>
      <ProductForm
        openForm={openProductForm}
        action={action}
        onOpenForm={() => handleOpenProductForm(true)}
        onCloseForm={() => handleOpenProductForm(false)}
      />
    </Box>
  );
};

export default Products;
