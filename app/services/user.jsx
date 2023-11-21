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

<<<<<<< HEAD
export const updateUserPersonalData = async (userInfo, id, token) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/update/${id}`,
=======
export const putUserInfo = async (newUserData, token) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/${newUserData.userId}`,
>>>>>>> develop
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
<<<<<<< HEAD
      data: userInfo,
=======
      data: {
        ...newUserData,
      },
>>>>>>> develop
    })
      .then((response) => resolve(response.data))
      .catch((error) => resolve(error));
  });
};
