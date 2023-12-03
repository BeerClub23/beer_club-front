import Cookies from "js-cookie";

export const GenerateInvoices = async () => {
    const token = Cookies.get("jwt");
    return new Promise((resolve, reject) => {
      const axios = require("axios");
      axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}payments/user/current`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };