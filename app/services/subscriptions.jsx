import useSWR from "swr";

const get = (url) => fetch(url).then((r) => r.json());

const subscriptions = [
  { id:1,
    name: "Novato",
    description: "",
    price: "100",
    benefits: [
      { name: "Descuentos en cervezas y locales asociados 5%"},
      { name: "Descuentos en Eventos de Miembros"},
      { name: "Recomendación Mensual para novatos (Six pack, snacks, aperitivos)"},
    ],
    isRecommended: false,
  },
  {
    id:2,
    name: "Especialista",
    description: "",
    price: "200",
    benefits: [
      {name: "Descuentos en cervezas y locales asociados 8%"},
      {name: "Descuentos en Eventos de Miembros"},
      {name: "Recomendación Mensual para especialistas (Six pack, snacks, aperitivos)"},
    ],
    isRecommended: true,
  },
  { id:3,
    name: "Experto",
    description: "",
    price: "300",
    benefits: [
      {name: "Descuentos en cervezas y locales asociados 10%"},
      {name: "Descuentos en Eventos de Miembros"},
      {name: "Recomendación Mensual para expertos (Six pack, snacks, aperitivos)"},
    ],
    isRecommended: false,
  },
];

export const useGetSubscriptions = () => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}subscriptions`, get, {
    fallbackData: subscriptions,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
  });

  return {
    subscriptions: data,
    isLoading,
    isError: error,
  };
};
