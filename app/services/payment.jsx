import Cookies from "js-cookie";

export const UpdatePayment = async (store) => {
  const token = Cookies.get("jwt");
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}payments/process`,
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
