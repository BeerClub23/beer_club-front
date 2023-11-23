export const getUserInfo = async (email, token) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/email/${email}`,
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

export const updateUserPersonalData = async (userInfo, id, token) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/update/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: userInfo,
    })
      .then((response) => resolve(response.data))
      .catch((error) => resolve(error));
  });
};

export const updateUserSubscription = async (userInfo, token) => {
  return new Promise((resolve, reject) => {
    const axios = require("axios");
    axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/update/subscription`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: userInfo,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getUserHistory = async (token) => {
  return new Promise((resolve, reject) => {
    const axios = require("axios");
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}payments/user/current`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
