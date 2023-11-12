import React from "react";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "../inputs/CustomTextFields";
import { ErrorMessage } from "@hookform/error-message";
import { Box } from "@mui/material";
import Cards from "react-credit-cards-2";
import { useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentData = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [state, setState] = useState({
    cardNumber: "",
    expDate: "",
    cvc: "",
    cardHolder: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    const fieldName = name.replace("card.", "");
    setState((prev) => ({ ...prev, [fieldName]: value.replace("card.", "") }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({
      ...prev,
      focus: evt.target.name.replace("card.", ""),
    }));
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 1 }}>
        Pago
      </Typography>
      <Cards
        number={state.cardNumber}
        expiry={state.expDate}
        cvc={state.cvc}
        name={state.cardHolder}
        focused={state.focus}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          margin: "15px 0px",
        }}
      ></Box>
      <CustomTextField
        name="card.cardNumber"
        label="Numero de Tarjeta"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        // value={state.number}
        onChange={(e) => {
          handleInputChange(e);
          trigger("card.cardNumber");
        }}
        onFocus={handleInputFocus}
      />

      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="card.cardNumber" />
      </Typography>

      <CustomTextField
        name="card.cardHolder"
        label="Nombre en la Tarjeta"
        type="text"
        control={control}
        defaultValue=""
        autocomplete=""
        // value={state.name}
        onChange={(e) => {
          handleInputChange(e);
          trigger("card.cardHolder");
        }}
        onFocus={handleInputFocus}
      />

      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="card.cardHolder" />
      </Typography>

      <CustomTextField
        name="card.expDate"
        label="Fecha de expiración"
        type="text"
        control={control}
        autocomplete=""
        defaultValue=""
        // value={state.expiry}
        onChange={(e) => {
          handleInputChange(e);
          trigger("card.expDate");
        }}
        onFocus={handleInputFocus}
      />

      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="card.expDate" />
      </Typography>

      <CustomTextField
        name="card.cvc"
        label="Fecha de expiración"
        type="text"
        control={control}
        autocomplete=""
        defaultValue=""
        onChange={(e) => {
          handleInputChange(e);
          trigger("card.cvc");
        }}
        onFocus={handleInputFocus}
        inputProps={{ maxLength: 3 }}
      />
      <Typography variant="caption" color="#d32f2fcf">
        <ErrorMessage errors={errors} name="card.cvc" />
      </Typography>
    </>
  );
};

export default PaymentData;
