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
import "./formAge.scss";

export default function FormAge({ saveAge }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { dirtyFields },
  } = useForm();

  const onSubmit = async (data) => {
    const userDate = `${data.year}-${data.month}-${data.day}`;
    try {
      const response = await fetch(
        `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`,
      );
      if (response.ok) {
        const dateResponse = await response.json();
        const userIP = dateResponse.ip;
        const userCity = dateResponse.city;
        console.log(
          "IP: " + userIP + ", City: " + userCity + ", Date:  " + userDate,
        );
        saveAge({
          ip: userIP,
          city: userCity,
          dateOfBirth: userDate,
          saveInfo: data.saveInfo,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  React.useEffect(() => {
    setFocus("day");
  }, [setFocus, router]);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl component="fieldset">
        <Typography
          variant="h4"
          className="poppins"
          sx={{ textAlign: "center" }}
        >
          Ingresa tu fecha de nacimiento?
        </Typography>

        <FormGroup aria-label="position" data-aos="fade-up">
          <Box sx={{ mb: 5, mt: 2, mx: "auto", textAlign: "center" }}>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <FormHelperText id="outlined-day-helper-text">DÍA</FormHelperText>
              <TextField
                id="outlined-adornment-day"
                aria-describedby="outlined-day-helper-text"
                type="number"
                placeholder="DD"
                {...register("day", { required: true, maxLength: 2 })}
                onInput={(e) => {
                  e.target.value = e.target.value.padStart(2, "0").slice(-2);
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <FormHelperText id="outlined-month-helper-text">
                MES
              </FormHelperText>
              <TextField
                id="outlined-adornment-month"
                aria-describedby="outlined-month-helper-text"
                type="number"
                placeholder="MM"
                {...register("month", { required: true, maxLength: 2 })}
                onInput={(e) => {
                  e.target.value = e.target.value.padStart(2, "0").slice(-2);
                }}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              variant="outlined"
              className="input-year"
            >
              <FormHelperText id="outlined-year-helper-text">
                AÑO
              </FormHelperText>
              <TextField
                id="outlined-adornment-year"
                aria-describedby="outlined-year-helper-text"
                type="number"
                placeholder="YYYY"
                {...register("year", { required: true, maxLength: 4 })}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4);
                }}
              />
            </FormControl>
          </Box>
          {dirtyFields.day && dirtyFields.month && dirtyFields.year && (
            <div className="recordar-datos" data-aos="fade-up">
              <FormControlLabel
                value="true"
                control={
                  <Checkbox
                    color="secondary"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    {...register("saveInfo")}
                  />
                }
                label="Recordar mis datos"
                labelPlacement="end"
              />
              <Typography variant="p">
                * BEER CLUB ES SOLO PARA MAYORES DE 18 AÑOS, <br /> NO
                SELECCIONES ESTA OPCIÓN SI COMPARTES ESTE COMPUTADOR CON MENORES
                DE EDAD.
              </Typography>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{ pt: "7px", mx: "auto", my: 5, fontWeight: "bold" }}
              >
                Ingresar
              </Button>
            </div>
          )}
        </FormGroup>
      </FormControl>
    </form>
  );
}

// export default FormAge;
