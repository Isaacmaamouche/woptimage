import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme } from "welcome-ui/theme";
import { WuiProvider } from "welcome-ui/WuiProvider";

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WuiProvider theme={theme}>
      <App />
    </WuiProvider>
  </StrictMode>
);
