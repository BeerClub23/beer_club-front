import React from 'react'
import Typography from '@mui/material/Typography';
import { useFormContext} from 'react-hook-form'
import { CustomTextField } from './inputs/CustomTextFields';
import { ErrorMessage } from '@hookform/error-message';
import { Box } from '@mui/material';
import Cards ,{Focused}from 'react-credit-cards-2';
import { useState, ChangeEvent, FocusEvent, } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';



const PaymentData = () => {
    const {control, formState:{errors}, trigger}=useFormContext()
    
    const [state, setState] = useState({
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      focus: '',
    });
    
    const handleInputChange = (evt) => {
      const { name, value } = evt.target;
      
      setState((prev) => ({ ...prev, [name]: value }));
    }
  
    const handleInputFocus = (evt) => {
      console.log(evt.target.name)
      setState((prev) => ({ ...prev, focus: evt.target.name }));
    }
    
  return (
    <>
    <Cards
        number={state.number}
        expiry={state.expDate}
        cvc={state.cvc}
        name={state.nameOnCard}
        focused={state.focus}
     
      />
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          margin: "15px 0px",
        }}
      >
     
      </Box>
        <CustomTextField
            name="number"
            label="Numero de Tarjeta"
            type="text"                 
            control={control}
            defaultValue=""
            autocomplete=''
            // value={state.number}            
            onChange={(e)=>{
              handleInputChange(e)
              trigger("number")
            }
          }     
            onFocus={handleInputFocus}    
          
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="number" />
        </Typography>

        <CustomTextField
            name="nameOnCard"
            label="Nombre en la Tarjeta"
            type="text"
            control={control}
            defaultValue=""
            autocomplete=""  
            // value={state.name}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("nameOnCard")
            }}     
            onFocus={handleInputFocus}       
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="nameOnCard" />
        </Typography>

        <CustomTextField
            name="expDate"
            label="Fecha de expiración"
            type="text"
            control={control}
            autocomplete=""
            defaultValue=""
            // value={state.expiry}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("expDate")
            }}     
            onFocus={handleInputFocus} 
            
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="expDate" />
        </Typography>           
        <CustomTextField
            name="cvc"
            label="codigo de seguridad cvc"
            type="password"
            control={control}
            defaultValue=""
            autocomplete="current-password"
            // value={state.cvc}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("cvc")
            }}     
            onFocus={handleInputFocus} 
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="cvc" />
        </Typography>

        </>
  )
}

export default PaymentData