import { ErrorMessage } from "@hookform/error-message";
import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomTextField } from "../inputs/CustomTextFields";
import { useFormContext } from "react-hook-form";

const PersonalData = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <>
      <Box key={"personal"}>
        <CustomTextField
          name="customer.name"
          label="Nombre"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onChange={() => {
            trigger("customer.name");
          }}
        />
        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.name" />
        </Typography>

        <CustomTextField
          name="customer.lastName"
          label="Apellido"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onChange={() => {
            trigger("customer.lastName");
          }}
        />

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.lastName" />
        </Typography>

        <CustomTextField
          name="customer.dateOfBirth"
          label="DD/MM/AAAA"
          type="date"
          control={control}
          defaultValue="DD-MM-AAAA"
          // autocomplete=""
          onBlur={() => {
            trigger("customer.dateOfBirth");
          }}
        />

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.dateOfBirth" />
        </Typography>

        <CustomTextField
          name="customer.phoneNumber"
          label="Teléfono"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onBlur={() => {
            trigger("customer.phoneNumber");
          }}
        />

        <Typography
          variant="caption"
          color="#d32f2fcf"
          sx={{ marginBottom: "0px" }}
        >
          <ErrorMessage errors={errors} name="customer.phoneNumber" />
        </Typography>

        <CustomTextField
          name="customer.email"
          label="Correo"
          type="email"
          control={control}
          defaultValue=""
          autocomplete=""
          onBlur={() => {
            trigger("customer.email");
          }}
        />

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.email" />
        </Typography>

        <CustomTextField
          name="customer.password"
          label="Contraseña"
          type="password"
          control={control}
          defaultValue=""
          autocomplete="new-password"
          onBlur={() => {
            trigger("customer.password");
          }}
        />
        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.password" />
        </Typography>

        {/* <CustomTextField sx={{ m: 1, width: '25ch' }} variant="outlined"
            fullWidth       
            sx={{ mb: 2, backgroundColor:'transparent' }}
            name='customer.password'    
            type='password'       
            control={control}
            onBlur={()=>{
                trigger("customer.password")
        }}                   
       >
        
        <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
          <FilledInput
          
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />   
              
        </CustomTextField>

                <Typography variant='caption' color='#d32f2fcf'>
                    <ErrorMessage errors={errors} name="customer.password" />
                </Typography>
      */}
        <CustomTextField
          name="customer.passwordConfirm"
          label="Confirmacion de contraseña"
          type="password"
          control={control}
          defaultValue=""
          autocomplete="new-password"
        />

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.passwordConfirm" />
        </Typography>
      </Box>
    </>
  );
};

export default PersonalData;
