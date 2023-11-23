"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import Box from "@mui/material/Box";
import { theme } from "../styles/materialThemeForm";
import FormLogin from "./formLogin/formLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./rules/index.js";
import { FormProvider, useForm } from "react-hook-form";
import "./login.scss";
import AOS from "aos";
import HeaderPublic from "@/app/components/headerPublic/headerPublic";
import { homeItems } from "@/app/common/constants/NavBarItems";
import Cookies from "js-cookie";

export default function LoginPage() {
  const method = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {},
  });

  useEffect(() => {
    AOS.init({
      duration: 900,
    });
    Cookies.remove("jwt");
  }, []);

  return (
    <main className="mainLogin">
      <HeaderPublic items={homeItems} />
      <div className="divLogin">
        <Box className="login" data-aos="fade-up">
          <ThemeProvider theme={theme}>
            <Image
              src={Logo}
              width={150}
              height={150}
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
