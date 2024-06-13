import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Unstable_NumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { Box, styled, FormControl, FormHelperText } from "@mui/material";

const RequiredMark = () => (
  <span
    aria-hidden="true"
    className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
  >
    *
  </span>
);

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-weight: 400;
  border-radius: 4px;
  color: ${grey[900]};
  background: #fff;
  border: 1px solid ${grey[400]};
  display: grid;
  grid-template-columns: auto 1fr auto 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.error} {
    border-color: ${theme.palette.error.main};
  }

  &.${numberInputClasses.root} + label {
    background-color: white;
    left: 0px;
    transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  }

  &.${numberInputClasses.focused} {
    border: 2px solid;
    border-color: ${theme.palette.primary.main};
  }

  &.${numberInputClasses.focused}.${numberInputClasses.error} {
    border-color: ${theme.palette.error.main};
  }

  &.${numberInputClasses.focused} + label {
    color: ${theme.palette.primary.main} !important;
  }

  &.${numberInputClasses.focused}.${numberInputClasses.error} + label {
    color: ${theme.palette.error.main} !important;
  }

  &:hover {
    border-color:${theme.palette.primary.main};
  }

  &:hover.${numberInputClasses.error} {
    border-color:${theme.palette.error.main};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-row: 1/3;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-size: 1rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 4/5;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.main};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 4/5;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  }

  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${theme.palette.primary.main};
    border-color: ${theme.palette.primary.main};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`
);

const NumberInput = ({
  id,
  label,
  name,
  value = 0,
  required,
  fullWidth = false,
  error = false,
  helperText = "",
  onChange,
  ...props
}) => {
  const BaseNumberInput = useMemo(
    () => styled(Unstable_NumberInput)`
      width: ${fullWidth ? "100%" : "auto"};
    `,
    [fullWidth]
  );

  const handleChange = useCallback(
    (event, newValue) => {
      event.target.name = name;
      event.target.value = newValue;
      if (onChange) onChange(event);
    },
    [name, onChange]
  );

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      variant="outlined"
      required={required}
    >
      <Box
        component="label"
        sx={{ mb: "4px", color: error ? "error.main" : "primary.main" }}
      >
        {label} {required && <RequiredMark />}
      </Box>
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            type: "button",
            children: "▴",
          },
          decrementButton: {
            type: "button",
            children: "▾",
          },
          input: { name, required },
        }}
        id={id}
        aria-label={label}
        value={value}
        onChange={handleChange}
        error={error}
        {...props}
      />
      <FormHelperText error={error} id={`${id}-error-text`}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
};

export default NumberInput;
