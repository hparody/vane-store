import { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, Typography, styled } from "@mui/material";

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

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${grey[900]};
  background: #fff;
  border: 1px solid ${grey[300]};
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
  };

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${theme.palette.secondary.light};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const OTPInput = ({ name, separator, length, value, onChange, label }) => {
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="caption">{label}</Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {new Array(length).fill(null).map((_, index) => (
          <Fragment key={`${name}-fragment-${index}`}>
            <BaseInput
              slots={{
                input: InputElement,
              }}
              aria-label={`Digit ${index + 1} of OTP`}
              slotProps={{
                input: {
                  ref: (ele) => {
                    inputRefs.current[index] = ele;
                  },
                  onKeyDown: (event) => handleKeyDown(event, index),
                  onChange: (event) => handleChange(event, index),
                  onClick: (event) => handleClick(event, index),
                  onPaste: (event) => handlePaste(event, index),
                  value: value[index] ?? "",
                },
              }}
            />
            {index === length - 1 ? null : separator}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

OTPInput.propTypes = {
  name: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default OTPInput;
