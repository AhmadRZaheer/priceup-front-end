import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { overrides } from "./overrides";

const theme = createTheme({
  palette,
  typography: {
    ...typography,
  },
  components: {
    ...overrides,
  },
});

export default theme;
