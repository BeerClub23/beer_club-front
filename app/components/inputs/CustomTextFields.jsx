import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomTextField = ({
  name,
  label,
  type,
  required,
  control,
  variant = "outlined",
  defaultValue,
  textFieldProps,
  aria_describedby,
  onChange,
  onFocus,
  onBlur,
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
          sx={{ mt: 2, backgroundColor: "transparent" }}
          {...textFieldProps}
          onBlur={(e) => {
            field.onBlur(e);
          }}
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
