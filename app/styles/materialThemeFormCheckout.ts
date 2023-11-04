import { blueGrey, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    // palette values for dark mode
    //  mode:'dark',
    primary: {
      main: "#CEB5A7",
      dark: "#907e74",
      light: "#d7c3b8",
    },
    secondary: {
      main: "#F5E1C1",
      dark: "#ab9d87",
      light: "#f7e7cd",
    },
    divider: blueGrey[700],
    background: {
      default: grey[1000],
      paper: grey[900],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#Fff",
          // boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.5), 0px 1px 3px 0px rgba(0,0,0,0.8)',
          boxShadow: "0px 4px 4px 1px rgba(0, 0, 0, 0.25)",
          gap: "0px !important",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#907e74",
          opacity: 0.9,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            // WebkitBoxShadow: ' 100px inset;',
            WebkitTextFillColor: "#000",
            // WebkitFillColor: '#907e74',
          },
          "&:-internal-autofill-selected": {
            backgroundColor: "#fff !important",
          },
        },
      },
    },
  },
});
