import useSWR from "swr";
import Cookies from "js-cookie";

const get = (url) => fetch(url).then((r) => r.json());

const subscriptions = [
  {
    id: 1,
    name: "Novato",
    description: "",
    price: "100",
    benefits: [
      { name: "Descuentos en cervezas y locales asociados 5%" },
      { name: "Descuentos en Eventos de Miembros" },
      {
        name: "Recomendación Mensual para novatos (Six pack, snacks, aperitivos)",
      },
    ],
    isRecommended: false,
  },
  {
    id: 2,
    name: "Especialista",
    description: "",
    price: "200",
    benefits: [
      { name: "Descuentos en cervezas y locales asociados 8%" },
      { name: "Descuentos en Eventos de Miembros" },
      {
        name: "Recomendación Mensual para especialistas (Six pack, snacks, aperitivos)",
      },
    ],
    isRecommended: true,
  },
  {
    id: 3,
    name: "Experto",
    description: "",
    price: "300",
    benefits: [
      { name: "Descuentos en cervezas y locales asociados 10%" },
      { name: "Descuentos en Eventos de Miembros" },
      {
        name: "Recomendación Mensual para expertos (Six pack, snacks, aperitivos)",
      },
    ],
    isRecommended: false,
  },
];

export const useGetSubscriptions = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}subscriptions`,
    get,
    {
      fallbackData: subscriptions,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    subscriptions: data,
    isLoading,
    isError: error,
  };
};

// CRUD METHODS
export const SaveSubscription = async (store) => {
  const token = Cookies.get("jwt");
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}subscriptions`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: store,
    })
      .then((response) => resolve(response))
      .catch((error) => resolve(error));
  });
};

export const UpdateSubscription = async (store, id) => {
  const token = Cookies.get("jwt");
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}subscriptions/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: store,
    })
      .then((response) => resolve(response))
      .catch((error) => resolve(error));
  });
};

export const getAllSubscriptions = async () => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}subscriptions?filterByStatus=false`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => resolve(error));
  });
};
