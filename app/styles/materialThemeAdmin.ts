import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#CEB5A7",
      dark: "#907e74",
      light: "#d7c3b8",
    },
    secondary: {
      main: "rgb(169,169,169)",
      dark: "rgba(0, 0, 0, 0.123)",
      light: "#f7e7cd",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          width: "80px",
        },
        colorPrimary: {
          backgroundColor: "#dae7cd",
          color: "rgb(8, 55, 8)",
          fontWeight: 600,
        },
        // Style for chip-table
        chipTable: {
          width: "170px",
          height: "35px",
          fontWeight: 600,
          marginLeft: "10px",
        },
        // Style for chip-table when active
        chipTableActive: {
          backgroundColor: "#CEB5A7",
          color: "black",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:hover, &.Mui-focused": {
            borderColor: "#CEB5A7",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#CEB5A7",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#CEB5A7",
            },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        addElementBtn: {
          backgroundColor: "black",
          color: "white",
          border: "none",
          "&:hover": {
            backgroundColor: "#CEB5A7",
            border: "none",
          },
        },
        cancelBtn: {
          border: "none",
          color: "darkgray",
          "&:hover": {
            color: "black",
            backgroundColor: "rgba(0, 0, 0, 0.123)",
          },
        },
      },
    },
  },
});
