"use client";
import "./page.scss";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
// import Logo1 from 'public/images/logo/Logo_sin_escudo_Blanco.svg';
// import Logo2 from 'public/images/logo/Logo_sin_escudo_Negro.svg';
// import Logo3 from 'public/images/logo/Logo_sin_escudo_Nuestra_paleta_de_colores.svg';
import { theme } from "./styles/materialThemeForm";
import FormAge from "./components/formAge/formAge";
import { useSaveAgeInfo } from "./services/saveAge";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

const post = (url, body) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
}).then((r) => r.json());

const AgePage = () => {
  const router = useRouter();

  const saveAge = async (ageInfo) => {
    const saveInfo = ageInfo.saveInfo;
    delete ageInfo.saveInfo;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Credentials', "true")
    headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )    
    const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}ageVerification`, ageInfo, {
      headers : headers});

    if (status < 400) {
      if (data.age >= 18) {
        if (saveInfo) {
          localStorage.setItem("AgeCheck", true);
          localStorage.setItem("Age", data.dateOfBirth);
        } else {
          sessionStorage.setItem("AgeCheck", true);
        }
        
        router.push(`/home`);
      } else {
        router.push(`/menor`);
      }
    } else {
      console.error("Failed to save data");
      router.push(`/menor`);
    }
    
  }
  
  return (
    <main className="mainAge">
      <ThemeProvider theme={theme}>
        <Image
          src={Logo}
          width={200}
          height={200}
          alt="Beer Club Logo"
          className="logo_age"
        />
        <FormAge saveAge={saveAge}/>
      </ThemeProvider>
    </main>
  );
}

export default AgePage;