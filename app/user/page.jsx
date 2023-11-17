/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect } from "react";
import { useUserBeerContext } from "@/app/context/user";
import ProductSection from "./product/Section";
import BenefitSection from "./benefits/Section";
import RecommendationSection from "./recommendation/Section";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box } from "@mui/material";

const recommendation = "Comida: Las cervezas negras suelen complementar muy bien platos ricos en sabores, como carnes asadas, estofados, platos a base de cordero o cerdo, quesos fuertes como el queso azul o el Gouda añejo, chocolate negro, postres con caramelo y café, así como platos picantes. Maridaje específico: Por ejemplo, una cerveza negra tipo Porter puede combinar muy bien con hamburguesas, mientras que una Stout puede ser excelente con postres como brownies o tartas de frutas.Temperatura:La temperatura ideal para servir una cerveza negra artesanal varía según el estilo específico, pero en general, se sugiere servirla entre 8-12 grados Celsius. Las cervezas negras tienden a liberar mejor sus sabores y aromas a medida que se calientan un poco, así que evita servirla demasiado fría. Degustación: Al probar una cerveza negra, presta atención a sus notas de sabor y aroma. Podrías notar sabores a café, chocolate, caramelo, frutas oscuras o tostadas, entre otros.Haz pequeños sorbos y deja que la cerveza recorra tu paladar para apreciar todos los matices.La temperatura ideal para servir una cerveza negra artesanal varía según el estilo específico, pero en general, se sugiere servirla entre 8-12 grados Celsius. Las cervezas negras tienden a liberar mejor sus sabores y aromas a medida que se calientan un poco, así que evita servirla demasiado fría."
const beerImage= "https://images.unsplash.com/photo-1619760078865-ee0f4c6586ee?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const beerImage2= "https://images.unsplash.com/photo-1603644197087-dbeeba73e106?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const UserPage = () => {
  const { user, setUser } = useUserBeerContext();
  const benefits = user?.subscription?.benefits;
 

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-quad',
      duration: 1000,
    });
  }, [])
  
  const images = [beerImage, beerImage2];


  return (
    <>
     <Box component="usermain" sx={{  minHeight:"100vh" }}>
      {/* <div style={{ minHeight: "100vh"}}>      */}
        <ProductSection images={images}/>
        <RecommendationSection recommendation={recommendation}/>
        <BenefitSection benefits={benefits}/>     
          
      {/* </div> */}
      </Box>
    
    </>
  );
};

export default UserPage;
