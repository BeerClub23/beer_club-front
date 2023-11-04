import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "aos/dist/aos.css";
import AOS from "aos";
import "./formLogin.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomTextField } from "../../components/formCheckout/inputs/CustomTextFields";

export default function FormLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async (data) => {
    // const response = await fetch(``);
    const response = true;
    if (response) {
      // const dataApi = await response.json();
      // router.push(`/home`)
      console.log("Estas dentro");
    } else {
      console.error("denegado");
    }
  };
  React.useEffect(() => {
    setFocus("email");
  }, [setFocus, router]);

  // React.useEffect(() => {
  //   AOS.init({
  //       duration: 1200,
  //     })
  // }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl component="fieldset">
        <Typography
          variant="h4"
          className="poppins"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Bienvenido
        </Typography>

        <FormGroup aria-label="position" sx={{ mt: 3 }}>
          <CustomTextField
            name="email"
            label="Email"
            type="email"
            control={control}
            defaultValue=""
            variant="standard"
            aria_describedby="outlined-day-helper-text"
          />
          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="email" />
          </Typography>

          <Controller
            name="pass"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl sx={{ mt: 3 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Contraseña
                </InputLabel>
                <Input
                  {...field}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
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
          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="pass" />
          </Typography>

          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ pt: "7px", mx: "auto", my: 5, fontWeight: "bold" }}
          >
            Ingresar
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
}
