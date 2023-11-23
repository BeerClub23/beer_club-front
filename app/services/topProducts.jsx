import Cookies from "js-cookie";
import useSWR from "swr";

const get = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((r) => r.json());

const topProducts = [
  {
    id: 0,
    name: "Rabieta Red Ipa 473cc",
    description:
      "Esta cerveza Roja Afrutada es ideal para aquellos que buscan una experiencia cervecera distinta y emocionante, donde la complejidad de los sabores se fusiona con la frescura de las frutas, ofreciendo un viaje sensorial único en cada botella.",
    image_url: [
      {
        url: "https://images.unsplash.com/photo-1559180786-c6f26acc1111?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1546339166-72eaf6a67c3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1613169251614-4ed9d5d478c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1505075106905-fb052892c116?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1552853041-59e6f459f83b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
    ],
    rating: 7,
  },
  {
    id: 1,
    name: "Corona",
    description:
      "Esta cerveza Roja Afrutada es ideal para aquellos que buscan una experiencia cervecera distinta y emocionante, donde la complejidad de los sabores se fusiona con la frescura de las frutas, ofreciendo un viaje sensorial único en cada botella.",
    image_url: [
      {
        url: "https://images.unsplash.com/photo-1552853041-59e6f459f83b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1559180786-c6f26acc1111?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1546339166-72eaf6a67c3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1613169251614-4ed9d5d478c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1505075106905-fb052892c116?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
    ],
    rating: 10,
  },
  {
    id: 2,
    name: "Antares",
    description:
      "Esta cerveza Roja Afrutada es ideal para aquellos que buscan una experiencia cervecera distinta y emocionante, donde la complejidad de los sabores se fusiona con la frescura de las frutas, ofreciendo un viaje sensorial único en cada botella.",
    image_url: [
      {
        url: "https://images.unsplash.com/photo-1546339166-72eaf6a67c3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1559180786-c6f26acc1111?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 320,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1613169251614-4ed9d5d478c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1505075106905-fb052892c116?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
      {
        url: "https://images.unsplash.com/photo-1552853041-59e6f459f83b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // width: 310,
        // height: 212,
      },
    ],
    rating: 9,
  },
];

export const useGetTopProducts = () => {
  const token = Cookies.get("jwt");
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}products/top`,
    (url) => get(url, token),
    {
      fallbackData: topProducts,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    topProducts: data,
    isLoadingTop: isLoading,
    isErrorTop: error,
  };
};
