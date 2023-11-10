import React from "react";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import UserSideBar from "../components/userSideBar/UserSideBar";
import { Box } from "@mui/material";
import "../../css/globals.css";

const UserLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <HeaderPublic />
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 4fr", minHeight: "calc(100vh - 280px)" }}
        id="cont"
      >
        <UserSideBar />
        <Box sx={{padding: '30px'}} id="user_wrapper">{children}</Box>
      </Box>
      <Footer />
    </div>
  );
};

export default UserLayout;
