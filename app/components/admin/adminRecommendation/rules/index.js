import * as yup from "yup";

export const recommendationSchema = yup.object({
  title: yup.string().required("El título es obligatorio."),
  description: yup
    .string()
    .max(255, "La descripción debe tener como máximo 255 caracteres.")
    .required("La descripción es obligatoria."),
  subscription_id: yup
    .number()
    .integer("La suscripción debe ser un número entero.")
    .min(0, ({ min }) => `Selecciona una suscripción válida.`)
    .required("La suscripción es obligatoria."),
  image_url: yup.string().required("La URL de la imagen es obligatoria."),
});

export const productSchema =  yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio."),
  description: yup.string().required("La descripción del producto es obligatoria."),
  image_url: yup.array().of(
    yup.object().shape({
      url: yup.string().required("La URL de la imagen del producto es obligatoria."),
    })
  ),
});