import * as React from "react"
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import myRoute from 'app/services/IpService/ipService.jsx';
 import { format } from 'date-fns';
import moment from 'moment';

export default function FormAge() {
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // console.log(moment().local());
    // console.log( myRoute())

    //Fecha actual
    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()

    // Fecha ingresada
    const date = new Date(`${data.month} ${data.day} ${data.year}`);
    const dateYear = date.getFullYear()
    const dateMonth = date.getMonth()
    const dateDay = date.getDate()

    // Diferencia de fechas
    const diffYear = todayYear - dateYear
    const diffMonth = todayMonth - dateMonth
    const diffDay = todayDay - dateDay


    if(diffYear > 18 || (diffYear === 18 && diffMonth > 0) || (diffMonth >= 0 && diffDay >= 0 )) {
      if(data.saveInfo){
        localStorage.setItem("AgeCheck", true)
        localStorage.setItem("Age", date)
      }else{
        sessionStorage.setItem("AgeCheck", true)
      }
      router.push(`/home`);
    }else{
      router.push(`/menor`);
    }
    
  }
  React.useEffect(() => {
    const ageCheckLocal = localStorage.getItem("AgeCheck")
    const ageCheckSession = sessionStorage.getItem("AgeCheck")
    if (ageCheckLocal || ageCheckSession){
      router.push(`/home`);
    }
    setFocus("day")
  }, [setFocus, router])

  return (
  <form onSubmit={handleSubmit(onSubmit)}> 

    <FormControl component="fieldset">
        <Typography variant="h3" className='poppins' sx={{ textAlign:'center'}}>Ingresa tu fecha de nacimiento?</Typography>
        
        <FormGroup aria-label="position">
          <Box >
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-day-helper-text">DÍA</FormHelperText>
              <TextField
                id="outlined-adornment-day"
                aria-describedby="outlined-day-helper-text"
                type="number"
                placeholder='DD'
                {...register("day")}
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
                {...register("month")}
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
                {...register("year")}
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
                  {...register("saveInfo")}
                />
              }
              label="Recordar mis datos"
              labelPlacement="end"
            />
            <Typography variant="p">*BEER CLUB ES SOLO PARA MAYORES DE 18 AÑOS, <br/> NO SELECCIONES ESTA OPCIÓN SI COMPARTES ESTE COMPUTADOR CON MENORES DE EDAD.</Typography>
          </div>
        </FormGroup>
        <Button variant="contained" size="large" type="submit" sx={{pt:'7px', mx:'auto', my: 5, fontWeight: 'bold' }}>
          Ingresar
        </Button>
      </FormControl>
    
    </form>
  )
}