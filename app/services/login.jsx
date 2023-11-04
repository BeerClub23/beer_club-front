const ApiFormLogin = async (store) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: "/api/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: store,
    })
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
};

export default ApiFormLogin;
