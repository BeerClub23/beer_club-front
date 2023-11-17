"use client";
import "./page.scss";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import { theme } from "./styles/materialThemeForm";
import FormAge from "./components/formAge/formAge";
// import FormAgeHoc from "./components/formAge/formAgeHoc";
import { useRouter } from "next/navigation";
import SaveAgeInfo from "@/app/services/saveAge";
import Cookies from "js-cookie";

const AgePage = () => {
  const router = useRouter();

  const saveAge = async (ageInfo) => {
    const saveInfo = ageInfo.saveInfo;
    delete ageInfo.saveInfo;
    const { data, status } = await SaveAgeInfo(ageInfo);

    if (status < 400) {
      if (data.age >= 18) {
        if (saveInfo) {
          Cookies.set("AgeCheck", true, { expires: 30 });
          Cookies.set("Age", data.dateOfBirth, { expires: 30 });
        } else {
          Cookies.set("AgeCheck", true);
        }

        router.push(`/home`);
      } else {
        router.push(`/menor`);
      }
    } else {
      console.error("Failed to save data");
      router.push(`/menor`);
    }
  };

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
        <FormAge saveAge={saveAge} />
      </ThemeProvider>
    </main>
  );
};

export default AgePage;
// export default FormAgeHoc(AgePage)
