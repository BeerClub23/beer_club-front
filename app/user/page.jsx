/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect } from "react";
import { useUserBeerContext } from "@/app/context/user";
import ProductSection from "./product/Section";
import BenefitSection from "./benefits/Section";
import RecommendationSection from "./recommendation/Section";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Typography } from "@mui/material";

const UserPage = () => {
  const { user, setUser } = useUserBeerContext();
  const benefits = user?.subscription?.benefits;
  console.log(user);
 

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-quad',
      duration: 1000,
    });
  }, [])
  
  return (
    <>
     <Box component="usermain" sx={{  minHeight:"100vh", backgroundColor:"white" }}>     
        
        {/* <ProductSection images={images}/> */}
        <RecommendationSection  id={1}/>
        <BenefitSection benefits={benefits}/>           
    </Box>
    
    </>
  );
};

export default UserPage;
