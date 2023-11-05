"use client";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import SubscriptionsSection from "./subscriptions/section";
import BannerSection from "./banner/Section";
import AboutSection from "./about/Section";
import AboutUsSection from "./aboutUs/Section";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);
  return (
    <>
      <HeaderPublic />
      <Box component="main" sx={{ pt: 13 }}>
        <BannerSection />
        <AboutUsSection />
        <AboutSection />
        <SubscriptionsSection />
      </Box>
      <Footer />
    </>
  );
}
