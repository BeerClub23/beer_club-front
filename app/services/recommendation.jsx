import useSWR from "swr";

const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const get = (url) => fetch(url).then((r) => r.json());

const recommendation = {
  id: 0,
  title: "Cerveza Roja Afrutada",
  description:
    "La cerveza Roja Afrutada tiene un perfil de sabores complejo que puede complementar muchos platos, va bien con carnes a la parrilla, como costillas de cerdo, pollo asado o cortes de carne ahumada. Esta cerveza suele disfrutarse mejor a una temperatura ligeramente más alta que las cervezas más livianas, se recomienda servirla entre 10-12 °C para apreciar completamente sus matices de sabor y aroma.Para resaltar sus características, se aconseja usar un vaso con boca ancha, como una copa tipo tulipa o una jarras,  ésto permite capturar y disfrutar mejor los aromas frutales y maltosos.",
  createDate: "2023-11-17",
  product: {
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
  },
  subscription_id: 0,
  image_url:
  "https://images.unsplash.com/photo-1605001677958-88a2ae045e26?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};


export const getRecommendationBySubscriptionIdAndDate = async (
  subscriptionId,
  token,
) => {
  const currentDate = new Date();
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "GET",
      url: `${
        process.env.NEXT_PUBLIC_API_URL
      }recommendations/${subscriptionId}/${currentDate.getDate()}-${
        MONTHS[currentDate.getMonth()]
      }-${currentDate.getFullYear()}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => resolve(error));
  });
}

