import React from "react";
import { Box, Typography } from "@mui/material";
import UserHistory from "../../../components/userHistory/UserHistory";
import "./Historial.scss";

const Historial = () => {
  return (
    <Box className="user-historycontainer">
      <Typography variant="h5">
        <b>Historial</b>
      </Typography>
      <UserHistory />
    </Box>
  );
};

export default Historial;
