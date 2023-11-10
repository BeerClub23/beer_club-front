import * as yup from "yup";

// Creamos el schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Este campo es obligatorio")
    .email("Ingrese un correo válido"),
  password: yup
    .string()
    .required("Este campo es obligatorio")
    .min(2, "Mínimo 2 caracteres")
    .max(15, "Máximo 15 caracteres"),
});
