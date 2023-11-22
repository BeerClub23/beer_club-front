const SaveAgeInfo = async (store) => {
  return new Promise((resolve) => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}ageVerification`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: store,
    })
      .then((response) => resolve(response))
      .catch((error) => resolve(error));
  });
};

export default SaveAgeInfo;
