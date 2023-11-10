"use client";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import { theme } from "../styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import "../page.scss";

export default function MenorPage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ pt: 13 }} className="mainAge">
          <Image
            src={Logo}
            width={300}
            height={300}
            alt="Beer Club Logo"
            className="logo_age"
          />
          <Typography variant="h4">ACCESO DENEGADO </Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Lo sentimos debes ser mayor de edad para acceder a esta pagina{" "}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/informacion-legal"
            target={"_blank"}
            sx={{ pt: "7px", mx: "auto", my: 5, fontWeight: "bold" }}
          >
            Información legal
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
}
