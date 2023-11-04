import { TextField } from '@mui/material';
import React, { ChangeEvent, FocusEvent } from "react";
import {  Controller } from 'react-hook-form';


export const CustomTextField = ({
  name,
  label,
  type,
  required,
  control,
  variant="outlined",
  defaultValue,
  textFieldProps,
  aria_describedby,
  error,
  message,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
         render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant={variant}
          fullWidth
          required={required}
          aria-describedby={aria_describedby}
          sx={{ mt: 2, backgroundColor:'transparent' }}
          {...textFieldProps}
     
         
        />
      )}
    />
  );
};