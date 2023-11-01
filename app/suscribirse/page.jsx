"use client"

import Box from '@mui/material/Box'
import * as yup from "yup"
import HeaderPublic from '../components/headerPublic/headerPublic'
import Footer from '../components/footer/Footer'
import { FormCheckout } from '../components/formCheckout/FormCheckout'
import { schema } from '../components/formCheckout/rules/index'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
// import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material'
import PlanCardFrom from '../components/planCardForm/PlanCardForm'


const CheckoutPage = ({ id=1})=>{
  // const router = useRouter();  
  

  const methods = useForm({    
    resolver: yupResolver(schema),    
    defaultValues :{
    },
    })      
       

  return (
    <>
      <HeaderPublic />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", backgroundColor: '#fafafa' }}>
           <Box component="main" sx={{ pt: 13 }}>
          {/* <Box sx={{ m: "20px" }}> */}
            <PlanCardFrom />

          </Box> 
          {/* {comic.stock !==0 ? */}
          <>

            <FormProvider {...methods}>
              <FormCheckout id={id} />
            </FormProvider>
          </>
          {/* :
          <>
          <Box sx={{margin:'0 auto'}}>
            <Typography >
              Lo sentimos, no hay stock disponible por el momento...
        </Typography>
      </Box>
      </> */}
      {/* }              */}

    </Box>
    <Footer />
    </> 

  );
}



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


export default CheckoutPage
