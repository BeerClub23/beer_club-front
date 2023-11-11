const ApiRegister = async (req) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}users/create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: req,
    })
      .then((response) => resolve(response))
      .catch((error) => resolve(error));
  });
};
export default ApiRegister;
