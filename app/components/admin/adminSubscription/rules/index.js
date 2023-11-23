import * as yup from "yup";

export const subscriptionSchema = yup.object({
  name: yup.string().required("Esta campo es obligatorio"),
  price: yup
    .number()
    .required("Estte campo es obligatorio")
    .min(1, "El precio debe ser mayor que 0"),
});
