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
};
