import React from "react";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "../inputs/CustomTextFields";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const AddressData = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const [country, setCountry] = React.useState([]);

  const handleChange = (event) => {
    setCountry(event.target.value);
    // trigger("address.country");
  };

  return (
    <>
      <CustomTextField
        name="address.street"
        label="Direccion"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        onChange={() => {
          trigger("address.street");
        }}
      />

      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="address.street" />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
        <CustomTextField
          name="address.number"
          label="Numero"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onChange={() => {
            trigger("address.number");
          }}
        />
        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="address.number" />
        </Typography>

        <CustomTextField
          name="address.floor"
          label="Piso"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onChange={() => {
            trigger("address.floor");
          }}
        />
        <Typography variant="caption" color="#d32f2fcf">
          <ErrorMessage errors={errors} name="address.floor" />
        </Typography>

        <CustomTextField
          name="address.apartment"
          label="Departamento"
          type="text"
          control={control}
          defaultValue=""
          autocomplete=""
          onChange={() => {
            trigger("address.apartment");
          }}
        />
      </Box>
      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="address.apartment" />
      </Typography>

      <CustomTextField
        name="address.city"
        label="Ciudad"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        onChange={() => {
          trigger("address.city");
        }}
      />
      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="address.city" />
      </Typography>

      <CustomTextField
        name="address.province"
        label="Provincia"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        onChange={() => {
          trigger("address.province");
        }}
      />
      <ErrorMessage errors={errors} name="address.stprovinceate" />
      <Typography variant="caption" color="#d32f2fcf"></Typography>

      <Controller
        name="address.country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth sx={{ mt: "10px" }}>
            <InputLabel id="demo-simple-select-label">Pais</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Pais"
              onChange={handleChange}
              onBlur={(e) => {
                field.onChange(e);
                trigger("address.country");
              }}
            >
              <MenuItem value={"Argentina"}>Argentina</MenuItem>
              <MenuItem value={"Colombia"}>Colombia</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="address.country" />
      </Typography>

      <CustomTextField
        name="address.zipCode"
        label="Codigo Postal"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        onChange={() => {
          trigger("address.zipCode");
        }}
      />
      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="address.zipCode" />
      </Typography>
    </>
  );
};

export default AddressData;
