"use client";

import React from "react";
import "./bienvenido.scss";
import { Typography } from "@mui/material";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import Box from "@mui/material/Box";
import Logo from "../../public/images/logo/Logo_sin_escudo_Color_Original.svg";
import { theme } from "../styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";
import { homeItems } from "../common/constants/NavBarItems";
import Image from "next/image";

const ConfirmPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <HeaderPublic items={homeItems} />
      <Box component="main" sx={{ pt: 13 }} className="containerBox">
        <Typography variant="h4" className="containerBox_title">
          Ya sos parte de Beer Club!!!{" "}
        </Typography>
        <Image src={Logo} width={300} height={300} alt="Beer Club Logo" />
      </Box>

      <Footer />
    </ThemeProvider>
  );
};

export default ConfirmPage;
