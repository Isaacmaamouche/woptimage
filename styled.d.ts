// styled.d.ts
import "styled-components";
import "@xstyled/styled-components";
import { ThemeValues } from "welcome-ui/theme";

interface AppTheme extends ThemeValues {
  // customize your theme
}

declare module "@xstyled/styled-components" {
  export interface Theme extends AppTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
