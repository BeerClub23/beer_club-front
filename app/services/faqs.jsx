import useSWR from "swr";

const get = (url) => fetch(url).then((r) => r.json());

const faqs = [
  {
    question: "¿Puedo cambiar de plan?",
    answer: "Si puedes cambiar tu plan siempre que lo desees desde tu perfil.",
  },
  {
    question: "¿Cuándo me llega la recomendación?",
    answer:
      "La primera semana de cada mes se estarán haciendo los envíos de las degustaciones. Te estará llegando un email o mensajes para informarte el día y horario de llegada.",
  },
  {
    question:
      "Tengo que cambiar la dirección ¿Cómo lo hago? y ¿Cuándo lo puedo hacer para que no perjudique el envío?",
    answer:
      "El cambio de dirección lo puedes hacer en cualquier momento desde tu perfil, datos personales. Lo único a tener en cuenta es que si ya recibiste el mail de que tu pedido salió, recomiendo que te contactes con nosotros vía whatsapp (+5491140221306) para que recibas tu degustación en el lugar correcto.",
  },
  {
    question:
      "¿Si mi degustación no llego en el tiempo informado, que debo hacer?",
    answer:
      "Esto no debería pasar, pero no te preocupes que siempre nos podés contactar al whatsapp (+5491140221306) que te vamos a ayudar a que tengas tu degustación lo antes posible.",
  },
  {
    question: "¿Que pasa si no estoy cuando viene a dejar mi degustación ?",
    answer:
      "No te preocupes, volveremos a pasar al día siguiente. La idea es que lo puedas degustar, por lo que pasaremos un máximo de tres veces y te estaremos mandando mensajes para mantenerte informado del horario en el que vamos a estar pasando.",
  },
];

export const useGetFaqs = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}faqs`,
    get,
    {
      fallbackData: faqs,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    faqs: data,
    isLoading,
    isError: error,
  };
};
