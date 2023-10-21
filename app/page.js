"use client"
import styles from './page.module.scss'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Checkbox, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from 'public/images/logo/Logo_sin_escudo_Color_Original.svg';
// import Logo1 from 'public/images/logo/Logo_sin_escudo_Blanco.svg';
// import Logo2 from 'public/images/logo/Logo_sin_escudo_Negro.svg';
// import Logo3 from 'public/images/logo/Logo_sin_escudo_Nuestra_paleta_de_colores.svg';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { theme } from './styles/materialThemeForm';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';


export default function AgePage() {

  const router = useRouter();

  const handleClickCheckAdult = () =>{
      router.push(`/home`);
  };
  return (
    <main className={styles.main}>
      <ThemeProvider theme={theme}>
      <Image
        src={Logo}
        width={300}
        height={300}
        alt='Beer Club Logo'
        className={styles.logo_age}
      />
      <FormControl component="fieldset">
        <Typography variant="h3" className='poppins' sx={{ textAlign:'center'}}>Ingresa tu fecha de nacimiento?</Typography>
        
        <FormGroup aria-label="position" col>
          <Box >
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-day-helper-text">DÍA</FormHelperText>
              <TextField
                id="outlined-adornment-day"
                aria-describedby="outlined-day-helper-text"
                type="number"
                placeholder='DD'
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2 )}}
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-month-helper-text">MES</FormHelperText>
              <TextField
                id="outlined-adornment-month"
                aria-describedby="outlined-month-helper-text"
                type="number"
                placeholder='MM'
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)}}
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-year-helper-text">AÑO</FormHelperText>
              <TextField
                id="outlined-adornment-year"
                aria-describedby="outlined-year-helper-text"
                type="number"
                placeholder='YYYY'
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}}
                required
              />
            </FormControl>
          </Box>
          <div className="recordar-datos">
          <FormControlLabel
              value="end"
              control={
                <Checkbox
                  color="secondary"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="Recordar mis datos"
              labelPlacement="end"
            />
            <Typography variant="p">*BEER CLUB ES SOLO PARA MAYORES DE 18 AÑOS, <br/> NO SELECCIONES ESTA OPCIÓN SI COMPARTES ESTE COMPUTADOR CON MENORES DE EDAD.</Typography>
          </div>
        </FormGroup>
        <Button variant="contained" size="large" onClick={handleClickCheckAdult} sx={{pt:'7px', mx:'auto', my: 5, fontWeight: 'bold' }}>
          Ingresar
        </Button>
      </FormControl>
      </ThemeProvider>
    </main>
  )
}

