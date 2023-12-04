"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import UserHistory from "../../../components/userHistory/UserHistory";
import "./Historial.scss";
import { getUserHistory } from "../../../services/user";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Historial = () => {
  const token = Cookies.get("jwt");
  const [userPaymentHistory, setUserPaymentHistory] = useState();

  const fetchData = async () => {
    try {
      const response = await getUserHistory(token);
      setUserPaymentHistory(response);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        imageAlt:
          "Hubo un error al consultar el historico. Intenta nuevamente!",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#ceb5a7",
        icon: "error",
        focusConfirm: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <Box className="user-historycontainer">
      <Typography variant="h5">
        <b>Historial</b>
      </Typography>
      {userPaymentHistory ? (
        <UserHistory userData={userPaymentHistory} onUpdateTable={fetchData} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Historial;
