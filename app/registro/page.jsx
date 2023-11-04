"use client";

import Box from "@mui/material/Box";
import * as yup from "yup";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import { FormCheckout } from "../components/formCheckout/FormCheckout";
import { schema } from "../components/formCheckout/rules/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// import { useRouter } from 'next/navigation';
import { Typography } from "@mui/material";
import PlanCardFrom from "../components/planCardForm/PlanCardForm";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const { context, setContext } = useAppContext();
  const category = context;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (!context?.subscription) {
      router.push("/home");
    }
  }, [context, router]);

  return (
    <>
      <HeaderPublic />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          backgroundColor: "#fafafa",
        }}
      >
        <Box component="main" sx={{ pt: 13 }}>
          {/* <Box sx={{ m: "20px" }}> */}
          <PlanCardFrom category={category?.subscription} />
        </Box>
        {/* {comic.stock !==0 ? */}

        <FormProvider {...methods}>
          <FormCheckout category={category?.subscription} />
        </FormProvider>

        {/* :
            <>
              <Box sx={{margin:'0 auto'}}>
                  <Typography sx={{marginTop:'60px'}}>
                    Debe seleccionar una suscripcion...
                </Typography>
              </Box>
            </>                      */}
      </Box>

      <Footer />
    </>
  );
};

/*export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id)
  const data = await getComic(id);
  return {
   props:{
    comic:data,
    id: id
    
   }
  };
};*/

export default CheckoutPage;