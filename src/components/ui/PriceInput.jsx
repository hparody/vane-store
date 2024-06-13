import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumberInput from "./NumberInput";
import { styled } from "@mui/material";

const InputAdornment = styled("div")(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: ${theme.palette.primary.light};
`
);

const PriceInput = (props) => (
  <NumberInput
    startAdornment={
      <InputAdornment>
        <AttachMoneyIcon fontSize="medium" />
      </InputAdornment>
    }
    {...props}
  />
);

export default PriceInput;
