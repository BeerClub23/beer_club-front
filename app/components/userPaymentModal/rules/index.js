import * as yup from "yup";

export const schema = yup.object().shape({
  card: yup.object().shape({
    cardNumber: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[0-9]{16}$/, "Debe ser un número de 16 dígitos"),
    cvc: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[0-9]{3}$/, "Debe ser un número de 3 dígitos"),
    expDate: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[0-9]{4}$/, "Debe ser un número de 4 dígitos"),
    cardHolder: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[a-zA-Z\s]+$/, "Solo se aceptan letras")
      .min(2, "Mínimo 2 caracteres")
      .max(20, "Máximo 20 caracteres"),
  }),
});
