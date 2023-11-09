import React from "react";
import UserLayout from "../UserLayout";
import UserData from "../../components/userBasicData/UserBasicData";
import { Box, Typography } from "@mui/material";
import UserHistory from "../../components/userHistory/UserHistory";
import "./Historial.scss";

const Historial = () => {
  return (
    <UserLayout>
      <UserData />
      <Box className="user-historycontainer">
        <Typography variant="h5">
          <b>Historial</b>
        </Typography>
        <UserHistory />
      </Box>
    </UserLayout>
  );
};

export default Historial;
