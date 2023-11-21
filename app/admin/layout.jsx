"use client";
import "@/app/globals.scss";
import React, { useEffect } from "react";
import HeaderPublic from "@/app/components/headerPublic/headerPublic";
import getUserInfo from "@/app/services/user";
import Cookies from "js-cookie";
import UserSideBarAdmin from "@/app/admin/userSideBarAdmin/UserSideBarAdmin";
import { Box } from "@mui/material";
import { useUserBeerContext } from "@/app/context/user";
import { jwtDecode } from "jwt-decode";
import { adminItems } from "../common/constants/NavBarItems";

const AdminLayout = ({ children }) => {
  const { user, setUser } = useUserBeerContext();
  const token = Cookies.get("jwt");
  const decodeToken = token ? jwtDecode(token.toString()) : null;

  useEffect(() => {
    const userInfo = async () => {
      return decodeToken ? await getUserInfo(decodeToken.email, token) : {};
    };
    userInfo().then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <div>
      <HeaderPublic items={user ? adminItems : []} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          minHeight: "100vh",
          pt: 13,
          overflowY: "hidden",
        }}
        id="cont"
      >
        <UserSideBarAdmin />
        <Box sx={{ padding: "30px" }} id="user_wrapper">
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default AdminLayout;
