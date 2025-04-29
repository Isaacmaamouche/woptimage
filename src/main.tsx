import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme } from "welcome-ui/theme";
import { WuiProvider } from "welcome-ui/WuiProvider";

const theme = createTheme();
console.debug("debbie theme", theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WuiProvider theme={theme}>
      <App />
    </WuiProvider>
  </StrictMode>
);
