"use client";
import React from "react";
import { Box } from "@mui/material";
import UpdateUserData from "../../../components/updateUserData/UpdateUserData";
import { useUserBeerContext } from "@/app/context/user";

const DatosPersonales = () => {
  const { user, setUser } = useUserBeerContext();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "2px 0px 1px #8D8D8D",
      }}
    >
      <UpdateUserData user={user} />
    </Box>
  );
};

export default DatosPersonales;
