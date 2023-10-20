"use client"
import styles from './page.module.scss'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from 'public/images/logo/Logo_sin_escudo_Color_Original.svg';
// import Logo1 from 'public/images/logo/Logo_sin_escudo_Blanco.svg';
// import Logo2 from 'public/images/logo/Logo_sin_escudo_Negro.svg';
// import Logo3 from 'public/images/logo/Logo_sin_escudo_Nuestra_paleta_de_colores.svg';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { theme } from './styles/materialThemeForm';


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
      />
      <Typography variant="h3" className='poppins'>Ingresa tu fecha de nacimiento?</Typography>
      <FormControl component="fieldset">
        <Button size="small" variant="outlined" onClick={handleClickCheckAdult} sx={{pt:'5px', mx:'auto'}}>
          Ingresar a la web
        </Button>
        <FormGroup aria-label="position" row>
          <div>
            
          </div>
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
      </FormControl>
      </ThemeProvider>
    </main>
  )
}

