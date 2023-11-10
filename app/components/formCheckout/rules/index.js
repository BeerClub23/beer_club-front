import * as yup from "yup";

function calculateAge(birthDate) {
  const today = new Date();
  const dob = new Date(birthDate);
  dob.setHours(dob.getHours() + 3);
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return age - 1;
  }
  return age;
}

export const schema = yup.object().shape({
  customer: yup.object().shape({
    name: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[a-zA-Z\s]+$/, "Solo se aceptan letras")
      .min(2, "Mínimo 2 caracteres")
      .max(10, "Máximo 10 caracteres"),
    lastName: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[a-zA-Z\s]+$/, "Solo se aceptan letras")
      .min(2, "Mínimo 2 caracteres")
      .max(10, "Máximo 10 caracteres"),
    birthdate: yup
      .string()
      .matches(
        /^(\d{4}-\d{2}-\d{2})$/,
        "El formato de fecha debe ser DD-MM-AAAA",
      )
      .required("Este campo es requerido")
      .test("is-adult", "Todavía sos menor", function (value) {
        const age = calculateAge(value);
        return age >= 18;
      }),
    telephone: yup
      .string()
      .required("Este campo es requerido")
      .matches(
        /^\d{10,13}$/,
        "Debe contener entre 10 y 13 dígitos sin el prefijo 15-",
      ),
    email: yup
      .string()
      .required("Este campo es requerido")
      .email("El correo no es válido")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
    password: yup
      .string()
      .required("Este campo es requerido")
      .matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[#$@!%&*?.])[A-Za-z\d#$@!%&*?.]{8,16}$/,
        "Debe contener 8-16 caracteres: letras, números y al menos un caracter especial",
      ),
    passwordConfirm: yup
      .string()
      .required("Este campo es requerido")
      .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
  }),
  address: yup.object().shape({
    street: yup
      .string()
      .required("Este campo es requerido")
      .min(2, "Mínimo 2 caracteres"),
    number: yup.string().required("*"),
    city: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[a-zA-Z\s]+$/, "Solo se aceptan letras")
      .min(2, "Mínimo 2 caracteres"),
    province: yup
      .string()
      .required("Este campo es requerido")
      .min(2, "Mínimo 2 caracteres"),
    country: yup.string().required("Este campo es requerido").min(2),
    zipCode: yup
      .string()
      .required("Este campo es requerido")
      .min(2, "Mínimo 2 caracteres"),
  }),
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
