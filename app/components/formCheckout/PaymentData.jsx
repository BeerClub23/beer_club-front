import React from 'react'
import Typography from '@mui/material/Typography';
import { useFormContext} from 'react-hook-form'
import { CustomTextField } from './inputs/CustomTextFields';
import { ErrorMessage } from '@hookform/error-message';
import { Box } from '@mui/material';


const PaymentData = () => {
    const {control, formState:{errors}}=useFormContext()      
    
  return (
    <>
      
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
          
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="card.number" />
        </Typography>

        <CustomTextField
            name="card.nameOnCard"
            label="Nombre en la Tarjeta"
            type="text"
            control={control}
            defaultValue=""
            autocomplete=""          
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="card.nameOnCard" />
        </Typography>

        <CustomTextField
            name="card.expDate"
            label="Fecha de expiración"
            type="text"
            control={control}
            autocomplete=""
            defaultValue=""
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="card.expDate" />
        </Typography>           
        <CustomTextField
            name="card.cvc"
            label="codigo de seguridad cvc"
            type="password"
            control={control}
            defaultValue=""
            autocomplete="current-password"
        />

        <Typography variant='caption' color='red'>
            <ErrorMessage errors={errors} name="card.cvc" />
        </Typography>

        </>
  )
}

export default PaymentData