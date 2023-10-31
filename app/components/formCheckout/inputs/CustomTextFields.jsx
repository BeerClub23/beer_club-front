import { TextField } from '@mui/material';
import React, { ChangeEvent, FocusEvent } from "react";
import {  Controller } from 'react-hook-form';


export const CustomTextField = ({
  name,
  label,
  type,
  required,
  control,
  defaultValue,
  textFieldProps,
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
          variant="outlined"
          fullWidth
          required={required}
          sx={{ mb: 2, backgroundColor:'transparent' }}
          {...textFieldProps}   
         
        />
      )}
    />
  );
};