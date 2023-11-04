import { TextField } from "@mui/material";
import React, { ChangeEvent, FocusEvent } from "react";
import { Controller } from "react-hook-form";

/*** */
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
/*** */

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
          variant="outlined"
          fullWidth
          required={required}
          sx={{ mb: 2, backgroundColor: "transparent" }}
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
