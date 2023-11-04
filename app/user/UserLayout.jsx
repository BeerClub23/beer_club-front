import React from "react";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import UserSideBar from "../components/userSideBar/UserSideBar";
import { Box } from "@mui/material";

const UserLayout = ({ children }) => {
  return (
    <div>
      <HeaderPublic />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <UserSideBar />
        <Box sx={{ margin: "10%", backgroundColor: "#D9D9D9" }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default UserLayout;
