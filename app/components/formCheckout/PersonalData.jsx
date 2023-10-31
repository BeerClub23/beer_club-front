import { ErrorMessage } from '@hookform/error-message'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { CustomTextField } from './inputs/CustomTextFields'
import { useFormContext } from 'react-hook-form'
import InputMask from 'react-input-mask';

const PersonalData = () => {
    const {control, formState:{errors}, trigger} =useFormContext()
    
    function calculateAge(birthDate) {
        const today = new Date();
        console.log(today);
        const dob = new Date(birthDate);
        dob.setHours(dob.getHours() + 3);
        console.log(dob);
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
      
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          return age - 1;
        }
      
        return age;
      }
    const age =  ((value) =>{      
        const age = calculateAge(new Date(value));     
        return age >= 18})
    
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
                    onChange={()=>{
                        trigger("customer.name")
                    }}
                   
                    
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
                    onChange={()=>{
                        trigger("customer.lastName")
                    }}
                />


                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.lastName" />
                </Typography>
               
              <CustomTextField
                    name="customer.dateOfBirth"
                    label="DDMMAAAA"
                    type="date"
                    control={control}
                    defaultValue="DD-MM-AAAA"
                    autocomplete=""
                    onChange={()=>{
                        trigger("customer.dateOfBirth")
                        trigger(age)
                    }}
                /> 


                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.datoOfBirth" />
                </Typography>

                <CustomTextField
                    name="customer.phoneNumber"
                    label="phone number"
                    type='text'
                    control={control}
                    defaultValue="+54 9 "
                    autocomplete=""
                    onChange={()=>{
                        trigger("customer.dateOfBirth")
                    }}
                /> 


                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.phoneNumber" />
                </Typography>


                <CustomTextField
                    name="customer.email"
                    label="Correo"
                    type="email"
                    control={control}
                    defaultValue=""
                    autocomplete=""
                    onChange={()=>{
                        trigger("customer.email")
                    }}
                />

                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.email" />
                </Typography>

                <CustomTextField
                    name="customer.password"
                    label="Contraseña"
                    type="password"
                    control={control}
                    defaultValue=""
                    autocomplete="new-password"                    
                />

                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.password" />
                </Typography>

                <CustomTextField
                    name="customer.passwordConfirm"
                    label="Confirmacion de contraseña"
                    type="password"
                    control={control}
                    defaultValue=""
                    autocomplete="new-password"
                />

                <Typography variant='caption' color='red'>
                    <ErrorMessage errors={errors} name="customer.passwordConfirm" />
                </Typography>
            </Box>
           
  
    </>
  )
}

export default PersonalData