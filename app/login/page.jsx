"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import Box from "@mui/material/Box";
import { theme } from "../styles/materialThemeForm";
import FormLogin from "./formLogin/formLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../rules/index.js";
import { FormProvider, useForm } from "react-hook-form";
import "./login.scss";
import AOS from "aos";

export default function LoginPage() {
  const method = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    AOS.init({
      duration: 900,
    });
  }, []);
  return (
    <main className="mainLogin">
      <div className="divLogin">
        <Box className="login" data-aos="fade-up">
          <ThemeProvider theme={theme}>
            <Image
              src={Logo}
              width={200}
              height={200}
              alt="Beer Club Logo"
              className="logo_age"
            />
            <FormProvider {...method}>
              <FormLogin />
            </FormProvider>
          </ThemeProvider>
        </Box>
      </div>
    </main>
  );
}
