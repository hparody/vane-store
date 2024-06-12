import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0D0D0D",
    },
    secondary: {
      main: "#BFBFBF",
    },
    mode: "light",
  },
  typography: {
    fontFamily: [
      "Inter, sans-serif",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
theme = responsiveFontSizes(theme);
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    white: theme.palette.augmentColor({
      color: {
        main: "#EEEEEE",
      },
      name: "white",
    }),
    black: theme.palette.augmentColor({
      color: {
        main: "#151515",
      },
      name: "black",
    }),
  },
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
