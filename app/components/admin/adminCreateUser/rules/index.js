import * as yup from "yup";

export const AdminUsersSchema = yup.object({
  name: yup.string().required("Esta campo es obligatorio"),
  lastName: yup.string().required("Esta campo es obligatorio"),
  email: yup
    .string()
    .required("Este campo es requerido")
    .email("El correo no es válido")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
  password: yup
    .string()
    .required("Este campo es requerido")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&?.])[A-Za-z\d#$@^!%+=&*?.]{8,16}$/,
      "Debe contener 8-16 caracteres: letras, números y al menos un caracter especial #$@^!%+=&*?.",
    ),
  passwordConfirm: yup
    .string()
    .required("Este campo es requerido")
    .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
});
