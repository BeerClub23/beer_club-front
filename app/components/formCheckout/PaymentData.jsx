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
      expDate: '',
      cvc: '',
      nameOnCard: '',
      focus: '',
    });
    
    const handleInputChange = (evt) => {
      const { name, value } = evt.target;
      const fieldName = name.replace('card.', '');
      setState((prev) => ({ ...prev, [fieldName]: value.replace('card.', "") }));
    }
  
    const handleInputFocus = (evt) => {
      console.log(evt.target.name.replace('card.', ''))
      setState((prev) => ({ ...prev, focus: evt.target.name.replace('card.', '') }));
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
            name="card.number"
            label="Numero de Tarjeta"
            type="text"                 
            control={control}
            defaultValue=""
            autocomplete=''
            // value={state.number}            
            onChange={(e)=>{
              handleInputChange(e)
              trigger("card.number")
            }
          }     
            onFocus={handleInputFocus}    
          
        />

        <Typography variant='caption' color='#d32f2fcf'>
            <ErrorMessage errors={errors} name="card.number" />
        </Typography>

        <CustomTextField
            name="card.nameOnCard"
            label="Nombre en la Tarjeta"
            type="text"
            control={control}
            defaultValue=""
            autocomplete=""  
            // value={state.name}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("card.nameOnCard")
            }}     
            onFocus={handleInputFocus}       
        />

        <Typography variant='caption' color='#d32f2fcf'>
            <ErrorMessage errors={errors} name="card.nameOnCard" />
        </Typography>

        <CustomTextField
            name="card.expDate"
            label="Fecha de expiración"
            type="text"
            control={control}
            autocomplete=""
            defaultValue=""
            // value={state.expiry}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("card.expDate")
            }}     
            onFocus={handleInputFocus} 
            
        />

        <Typography variant='caption' color='#d32f2fcf'>
            <ErrorMessage errors={errors} name="card.expDate" />
        </Typography>           
        
        <CustomTextField
            name="card.cvc"
            label="codigo de seguridad cvc"
            type="password"
            control={control}
            defaultValue=""
            autocomplete="current-password"
            // value={state.cvc}
            onChange={(e)=>{
              handleInputChange(e)
              trigger("card.cvc")
            }}     
            onFocus={handleInputFocus} 
        />

        <Typography variant='caption' color='#d32f2fcf'>
            <ErrorMessage errors={errors} name="card.cvc" />
        </Typography>

        </>
  )
}

export default PaymentData