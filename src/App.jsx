import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import {
  ProductsProvider,
  ThemeProvider,
  AuthProvider,
  ShoppingCartProvider,
} from "./providers";
import Router from "./router/Router";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <SnackbarProvider autoHideDuration={4000}>
        <ProductsProvider>
          <AuthProvider>
            <ShoppingCartProvider>
              <Router />
            </ShoppingCartProvider>
          </AuthProvider>
        </ProductsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
