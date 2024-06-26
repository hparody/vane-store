import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import useAlert from "@/hooks/useAlert";
import PriceInput from "@/components/ui/PriceInput";
import NumberInput from "@/components/ui/NumberInput";
import ImageFileUpload from "@/components/ui/ImageFileUpload";
import Drawer from "@/components/ui/Drawer";
import { ACTION_CREATE, ACTION_EDIT } from "@/constants/actions";
import useProducts from "@/hooks/useProducts";

const defaultEmptyErrorObject = { error: false, message: "" };

const formOptions = {
  [ACTION_CREATE]: {
    formTitle: "Añadir nuevo producto",
    saveLabel: "Guardar",
    cancelLabel: "Cancelar",
    confirmationMessage: "Producto creado exitosamente",
  },
  [ACTION_EDIT]: {
    formTitle: "Editar producto",
    saveLabel: "Actualizar",
    cancelLabel: "Cancelar",
    confirmationMessage: "Producto actualizado correctamente",
  },
};

const DEFAULT_VALUES = {
  name: "",
  description: "",
  price: null,
  stock: null,
  image: "",
};

const DEFAULT_ERRORS = {
  name: defaultEmptyErrorObject,
  description: defaultEmptyErrorObject,
  price: defaultEmptyErrorObject,
  stock: defaultEmptyErrorObject,
  image: defaultEmptyErrorObject,
};

const errorMessages = {
  name: "Ingresa un nombre",
  description: "Ingresa una descripción",
  price: "Ingresa un precio",
  stock: "Ingresa un valor de stock",
};

const ProductForm = ({
  openForm,
  onOpenForm,
  onCloseForm,
  action = ACTION_CREATE,
  product = DEFAULT_VALUES,
}) => {
  const { triggerAlert } = useAlert();
  const { createProduct } = useProducts();

  const [values, setValues] = useState(product ?? DEFAULT_VALUES);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [savingForm, setSavingForm] = useState(false);
  const {
    formTitle = "",
    saveLabel = "",
    cancelLabel = "",
  } = formOptions[action] || {};

  useEffect(() => {
    setValues(product ?? DEFAULT_VALUES);
  }, [product]);

  const cleanValues = () => setValues(DEFAULT_VALUES);
  const cleanErorrs = () => setErrors(DEFAULT_ERRORS);

  // Unmount component
  useEffect(() => {
    return cleanValues();
  }, []);

  const isFieldValid = (fieldName, fieldValue) => {
    if (fieldName === "image") return true;
    let hasError = false;
    if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
      hasError = true;
    }
    return !hasError;
  };

  const handleChange = useCallback(
    (event) => {
      let val = event?.target ? event.target.value : event.value;
      let name = event?.target ? event.target.name : event.name;
      if (name === "price" || name === "stock") {
        val = Number.parseFloat(val);
        val = isNaN(val) ? null : val;
      }
      setValues({ ...values, [name]: val });
      const isValid = isFieldValid(name, val);
      setErrors({
        ...errors,
        [name]: {
          error: !isValid,
          message: !isValid ? errorMessages[name] : "",
        },
      });
    },
    [errors, values]
  );

  const areAllFieldsValid = useCallback(() => {
    const fieldsHaveErrors = Object.values(errors).some((field) => field.error);
    let fieldsFilled = true;
    for (const fieldName in values) {
      const isValid = isFieldValid(fieldName, values[fieldName]);
      if (fieldName !== "image" && !isValid) {
        fieldsFilled = false;
        setErrors((errs) => ({
          ...errs,
          [fieldName]: {
            error: true,
            message: errorMessages[fieldName],
          },
        }));
      }
    }
    return !fieldsHaveErrors && fieldsFilled;
  }, [errors, values]);

  const handleSubmit = async () => {
    if (areAllFieldsValid()) {
      setSavingForm(true);
      const { error, response } = await createProduct(values);
      if (!error) {
        triggerAlert({
          type: "success",
          message: formOptions[action].confirmationMessage,
        });
        handleClose();
      } else {
        triggerAlert({
          type: "error",
          message:
            "Ocurrió un error al crear el producto. Por favor, intente de nuevo más tarde.",
        });
      }
      setSavingForm(false);
    } else {
      triggerAlert({
        type: "error",
        message: "Por favor, completa todos los campos para poder guardar.",
      });
    }
  };

  const handleClose = () => {
    cleanValues();
    cleanErorrs();
    onCloseForm();
  };

  return (
    <Drawer
      anchor="right"
      title={formTitle}
      openDrawer={openForm}
      onOpen={onOpenForm}
      onClose={handleClose}
    >
      <ImageFileUpload
        name="image"
        value={values.image}
        onFileUpload={handleChange}
        buttonLabel="Adjuntar imagen"
        alt="Imagen de Producto"
      />
      <TextField
        id="id_name"
        label="Nombre"
        placeholder="Nombre"
        name="name"
        variant="outlined"
        type="text"
        value={values.name}
        onChange={handleChange}
        disabled={savingForm}
        required
        fullWidth
        error={errors.name.error}
        helperText={errors.name.message}
      />
      <TextField
        id="id_description"
        label="Descripción"
        placeholder="Descripción"
        name="description"
        variant="outlined"
        type="text"
        multiline
        minRows={3}
        value={values.description}
        onChange={handleChange}
        disabled={savingForm}
        required
        fullWidth
        error={errors.description.error}
        helperText={errors.description.message}
      />
      <PriceInput
        id="id_price"
        label="Precio"
        placeholder="Precio"
        error={errors.price.error}
        helperText={errors.price.message}
        name="price"
        min={0}
        fullWidth
        required
        onChange={handleChange}
        value={values.price}
      />
      <NumberInput
        id="id_stock"
        label="Stock"
        placeholder="Stock"
        error={errors.stock.error}
        helperText={errors.stock.message}
        name="stock"
        min={0}
        step={1}
        fullWidth
        required
        onChange={handleChange}
        value={values.stock}
      />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <Button
          type="button"
          color="primary"
          variant="outlined"
          onClick={handleClose}
          disabled={savingForm}
          startIcon={<DisabledByDefaultIcon />}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={savingForm}
          startIcon={<SaveIcon />}
        >
          {saveLabel}
        </Button>
      </Box>
    </Drawer>
  );
};

ProductForm.propTypes = {
  openForm: PropTypes.bool.isRequired,
  onOpenForm: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default ProductForm;
