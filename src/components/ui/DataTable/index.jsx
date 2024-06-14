import { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AlertDialog from "../AlertDialog";
import NoRowsOverlay from "./NoRowsOverlay";

const DEFAULT_DELETE_PROPS = {
  dialogId: "id_confirm_delete_dialog",
  title: "Eliminar registro",
  content: "¿Está seguro que desea eliminar este registro?",
  cancelText: "Cancelar",
  confirmText: "Eliminar",
};

const DataTable = ({
  columns,
  rows,
  noRowsLabel = "No hay datos",
  includeActions = false,
  onEdit,
  onDelete,
  deleteProps: {
    dialogId = DEFAULT_DELETE_PROPS.dialogId,
    title = DEFAULT_DELETE_PROPS.title,
    content = DEFAULT_DELETE_PROPS.content,
    cancelText = DEFAULT_DELETE_PROPS.cancelText,
    confirmText = DEFAULT_DELETE_PROPS.confirmText,
    onCancelDeletion = null,
  },
  sx = {},
  ...props
}) => {
  const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const onCloseDeletionDialog = () => {
    if (onCancelDeletion) onCancelDeletion();
    setOpenDeletionDialog(false);
    setRecordToDelete(null);
  };

  const onConfirmDeletion = () => {
    onDelete(recordToDelete.id);
    setOpenDeletionDialog(false);
    setRecordToDelete(null);
  };

  const handleDelete = useCallback((record) => {
    setOpenDeletionDialog(true);
    setRecordToDelete(record);
  }, []);

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
                  onClick={() => handleDelete(params)}
                />,
              ],
            },
          ]
        : columns,
    [columns, handleDelete, includeActions, onEdit]
  );
  return (
    <Fragment>
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
        pageSizeOptions={[10, 20, 50, 100]}
        {...props}
      />
      <AlertDialog
        id={dialogId}
        open={openDeletionDialog}
        title={title}
        content={content}
        cancelText={cancelText}
        confirmText={confirmText}
        onClose={onCloseDeletionDialog}
        onConfirm={onConfirmDeletion}
      />
    </Fragment>
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
  deleteProps: PropTypes.shape({
    dialogId: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    onCancelDeletion: PropTypes.func,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
  }),
};

export default DataTable;
