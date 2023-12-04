import useSWR from "swr";
import Cookies from "js-cookie";

export const getAllAdminUsers = async () => {
  const token = Cookies.get("jwt");
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/all`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) =>
        resolve(response.data.filter((el) => el.role === "ADMIN")),
      )
      .catch((error) => resolve(error));
  });
};

export const SaveAdminUser = async (store) => {
  const token = Cookies.get("jwt");
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/create/admin`,
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
