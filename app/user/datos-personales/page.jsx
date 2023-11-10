import React from "react";
import UserLayout from "../UserLayout";
import UserData from "../../components/userBasicData/UserBasicData";
import { Box } from "@mui/material";
import UpdateUserData from "../../components/updateUserData/UpdateUserData";

const DatosPersonales = () => {
  return (
    <UserLayout>
      <UserData />
      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "2px 0px 1px #8D8D8D",
        }}
      >
        <UpdateUserData />
      </Box>
    </UserLayout>
  );
};

export default DatosPersonales;
