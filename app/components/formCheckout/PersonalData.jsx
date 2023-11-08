import { ErrorMessage } from "@hookform/error-message";
import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomTextField } from "../inputs/CustomTextFields";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PersonalData = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConf, setShowPasswordConf] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConf = () =>
    setShowPasswordConf((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          name="customer.birthdate"
          label="DD/MM/AAAA"
          type="date"
          control={control}
          defaultValue="DD-MM-AAAA"
          // autocomplete=""
          onBlur={() => {
            trigger("customer.birthdate");
          }}
        />

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.birthdate" />
        </Typography>

        <CustomTextField
          name="customer.telephone"
          label="Teléfono"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onBlur={() => {
            trigger("customer.telephone");
          }}
        />

        <Typography
          variant="caption"
          color="#d32f2fcf"
          sx={{ marginBottom: "0px" }}
        >
          <ErrorMessage errors={errors} name="customer.telephone" />
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

        <Controller
          name="customer.password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl sx={{ width: "100%", mt: "10px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Contraseña"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        />
        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.password" />
        </Typography>

        <Controller
          name="customer.passwordConfirm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl sx={{ width: "100%", mt: "10px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-password"
                type={showPasswordConf ? "text" : "password"}
                variant="outlined"
                label="Confirmar Contraseña"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConf}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswordConf ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        />

        {/* <CustomTextField
          name="customer.passwordConfirm"
          label="Confirmacion de contraseña"
          type="password"
          control={control}
          defaultValue=""
          autocomplete="new-password"
        /> */}

        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="customer.passwordConfirm" />
        </Typography>
      </Box>
    </>
  );
};

export default PersonalData;
