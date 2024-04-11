import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#EFBC9B",
    },
    secondary: {
      main: "#FBF3D5",
    },

    error: {
      main: "#red",
    },
    background: {
      default: "#fff",
      paper: "#D7E4C0",
    },
    text: {
      primary: "#423731", // your desired color
    },
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
