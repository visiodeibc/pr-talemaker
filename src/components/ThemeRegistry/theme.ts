import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8DE9B3",
    },
    secondary: {
      main: "#FBF3D5",
    },
    error: {
      main: "#red",
    },
    info: {
      main: "#424242",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FAF5F9",
    },
    text: {
      primary: "#303030", // your desired color
      secondary: "#6B8E23", // your desired color
    },
    mode: "light",
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
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
