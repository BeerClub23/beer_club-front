import { ErrorMessage } from '@hookform/error-message'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { CustomTextField } from './inputs/CustomTextFields'
import { useFormContext } from 'react-hook-form'


const PersonalData = () => {
    const {control, formState:{errors}} =useFormContext()
    
  return (
    <>  
      
            <Box key={"personal"} >
                <CustomTextField                    
                    name="customer.name"
                    label="Nombre"
                    type="text"
                    control={control}
                    defaultValue=""
                    autocomplete=""
                    
                   
                    
                />
                <Typography variant='caption' color='red' >
                    <ErrorMessage errors={errors} name="customer.name"/>
                </Typography>

                <CustomTextField
                    name="customer.lastName"
                    label="Apellido"
                    type="text"
                    control={control}
                    defaultValue=""
                    autocomplete=""
                />


                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.lastName" />
                </Typography>

                <CustomTextField
                    name="customer.email"
                    label="Correo"
                    type="email"
                    control={control}
                    defaultValue=""
                    autocomplete=""
                />

                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.email" />
                </Typography>
            </Box>
           
  
    </>
  )
}

export default PersonalData