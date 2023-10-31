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
  onChange,
  onFocus
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
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          onFocus={(e) => {
            onFocus?.(e);
          }}
        />
      )}
    />
  );
};