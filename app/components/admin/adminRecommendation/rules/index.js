import * as yup from "yup";

export const recommendationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es requerido")
    .min(2, "Mínimo 2 caracteres"),
  description: yup
    .string()
    .required("La descripción es requerida")
    .min(2, "Mínimo 2 caracteres"),
  subscription_id: yup.string().required("La suscripción es requerida"),
  image_url: yup.string().required("La imagen de recomendación es requerida"),
  product: yup.object().shape({
    name: yup
      .string()
      .required("El nombre del producto es requerido")
      .min(2, "Mínimo 2 caracteres"),
    description: yup
      .string()
      .required("La descripción del producto es requerida")
      .min(2, "Mínimo 2 caracteres"),
    image_url: yup.array().of(
      yup.object().shape({
        name: yup.string().required("El nombre de la imagen es requerido"),
      }),
    ),
  }),
});
