'use client'

import React from 'react'
import './bienvenido.scss'
import { Button,  Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Logo from 'public/images/logo/Logo_sin_escudo_Color_Original.svg';
import { theme } from '../styles/materialThemeForm';
import {  ThemeProvider } from '@mui/material';
import Image from 'next/image';


const ConfirmPage = () => {
  return (
  <ThemeProvider theme={theme}>
    
    <Box component="main" sx={{ pt: 13 } } className='container' >
      <Image src={Logo}
        width={300}
        height={300}
        alt='Beer Club Logo'
        />
      <Typography variant="h4" className='container_title'>Felicitaciones por tu suscripcion!!! </Typography> 
      
      
    </Box>
    
   
    </ThemeProvider>
  )
}

export default ConfirmPage