import * as yup from "yup";

export const subscriptionSchema = yup.object({
  name: yup
    .string()
    .required("Esta campo es obligatorio")
    .matches(/^[a-zA-Z\s]+$/, "Solo se aceptan letras")
    .min(2, "Mínimo 2 caracteres"),
  price: yup
    .number()
    .required("Estte campo es obligatorio")
    .min(1, "El precio debe ser mayor que 0"),
});
