import { useMemo } from "react";
import PropTypes from "prop-types";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import NoRowsOverlay from "./NoRowsOverlay";

const DataTable = ({
  columns,
  rows,
  noRowsLabel = "No hay datos",
  includeActions = false,
  onEdit,
  onDelete,
  sx = {},
  ...props
}) => {
  const datagridColumns = useMemo(
    () =>
      includeActions
        ? [
            ...columns,
            {
              field: "actions",
              headerName: "Acciones",
              type: "actions",
              getActions: (params) => [
                <GridActionsCellItem
                  key={`action-edit-${params.id}`}
                  icon={<EditIcon />}
                  label="Duplicate User"
                  onClick={() => onEdit(params.id)}
                />,
                <GridActionsCellItem
                  key={`action-delete-${params.id}`}
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => onDelete(params.id)}
                />,
              ],
            },
          ]
        : columns,
    [columns, includeActions, onDelete, onEdit]
  );
  return (
    <DataGrid
      autoHeight
      checkboxSelection={true}
      columns={datagridColumns}
      rows={rows}
      slots={{ noRowsOverlay: NoRowsOverlay }}
      slotProps={{ noRowsOverlay: { title: noRowsLabel } }}
      sx={{ "--DataGrid-overlayHeight": "300px", ...sx }}
      autosizeOnMount={true}
      autosizeOptions={{
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1,
        expand: true,
      }}
      {...props}
    />
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  sx: PropTypes.object,
  includeActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  noRowsLabel: PropTypes.string,
};

export default DataTable;
