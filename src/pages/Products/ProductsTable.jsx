import PropTypes from "prop-types";
import { useMemo } from "react";
import { Avatar } from "@mui/material";

import DataTable from "@/components/ui/DataTable";

const parseProducts = (products) => {
  return products.map(
    ({ id, name, description, price, stock, image }, index) => ({
      order: index + 1,
      id: id,
      name: name,
      description: description,
      price: price,
      stock: stock,
      image: image,
    })
  );
};

const ProductsTable = ({
  products,
  loadingProducts = false,
  onEditProduct,
  onDeleteProduct,
}) => {
  const tableRows = useMemo(() => parseProducts(products), [products]);

  const tableColumns = [
    { field: "order", type: "number", headerName: "#", maxWidth: 100 },
    {
      field: "image",
      headerName: "Imagen",
      display: "flex",
      description: "Imagen del producto",
      renderCell: (params) => (
        <Avatar alt={params.name} src={params.value} variant="rounded" />
      ),
    },
    {
      field: "name",
      type: "string",
      headerName: "Nombre",
      description:
        "Nombre descriptivo y específico del producto, tal como aparece en su registro oficial.",
    },
    {
      field: "description",
      type: "string",
      headerName: "Descripción",
      description:
        "Una breve descripción del producto, sus características, modo de uso y cuidados del mismo.",
      flex: 1,
    },
    {
      field: "price",
      type: "number",
      headerName: "Precio",
      description: "Precio incluyendo impuestos",
      valueFormatter: (value) => {
        if (value == null) {
          return "";
        }
        return `$ ${value.toLocaleString()}`;
      },
    },
    {
      field: "stock",
      type: "number",
      headerName: "Stock",
      description: "Cantidad de items disponibles de este producto.",
    },
  ];

  return (
    <DataTable
      rows={tableRows}
      columns={tableColumns}
      noRowsLabel="No hay productos para mostrar"
      includeActions
      onEdit={onEditProduct}
      onDelete={onDeleteProduct}
      loading={loadingProducts}
    />
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadingProducts: PropTypes.bool,
  onEditProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export default ProductsTable;
