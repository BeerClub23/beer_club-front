"use client";
import React from "react";
import { Box } from "@mui/material";
import UpdateUserData from "../../../components/updateUserData/UpdateUserData";
import { useUserBeerContext } from "../../../context/user";
import Cookies from "js-cookie";
import { updateUserPersonalData } from "../../../services/user";

const DatosPersonales = () => {
  const { user, setUser } = useUserBeerContext();
  const token = Cookies.get("jwt");

  const updateUserInfo = async (userData) => {
    const response = await updateUserPersonalData(userData, user.id, token);
    setUser(response);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "2px 0px 1px #8D8D8D",
      }}
    >
      <UpdateUserData user={user} updateData={updateUserInfo} />
    </Box>
  );
};

export default DatosPersonales;
