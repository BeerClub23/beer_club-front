"use client";
import React from "react";
import { Box } from "@mui/material";
import { useUserBeerContext } from "../../context/user";
import UpdateUserData from "../../components/updateUserData/UpdateUserData";
import Cookies from "js-cookie";
import { updateUserPersonalData } from "../../services/user";
import { useGetSubscriptions } from "../../services/subscriptions";

const DatosPersonales = () => {
  const { user, setUser } = useUserBeerContext();
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const token = Cookies.get("jwt");

  const updateUserInfo = async (userData) => {
    const response = await updateUserPersonalData(userData, user.id, token);
    const currentSubscription = subscriptions.find(
      (subscription) => subscription.id === response.subscriptionId,
    );
    setUser({ ...response, subscription: currentSubscription });
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
