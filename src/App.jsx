import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import ThemeProvider from "./providers/ThemeProvider";
import Router from "./router/Router";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <SnackbarProvider autoHideDuration={4000}>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
