"use client"
import styles from './page.module.css'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function Age() {

  const router = useRouter();

  const handleClickCheckAdult = () =>{
      router.push(`/home`);
  };
  return (
    <main className={styles.main}>
      <h1>Ingresa tu fecha de nacimiento?</h1>
      <Button size="small" variant="outlined" onClick={handleClickCheckAdult} sx={{pt:'5px'}}>
        Ir a la home
      </Button>
    </main>
  )
}

