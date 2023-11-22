"use client";
import "@/app/globals.scss";
import React, { useEffect } from "react";
import Footer from "@/app/components/footer/Footer";
import HeaderPublic from "@/app/components/headerPublic/headerPublic";
import { getUserInfo } from "@/app/services/user";
import Cookies from "js-cookie";
import UserSideBar from "@/app/components/userSideBar/UserSideBar";
import UserData from "@/app/components/userBasicData/UserBasicData";
import { Box } from "@mui/material";
import { useUserBeerContext } from "@/app/context/user";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { memberItems } from "../common/constants/NavBarItems";
import { useGetSubscriptions } from "../services/subscriptions";

const UserLayout = ({ children }) => {
  const pathname = usePathname();
  const { user, setUser } = useUserBeerContext();
  const { subscriptions, isLoading, isError } = useGetSubscriptions();

  const token = Cookies.get("jwt");
  const decodeToken = token ? jwtDecode(token.toString()) : null;

  useEffect(() => {
    const userInfo = async () => {
      return decodeToken ? await getUserInfo(decodeToken.email, token) : {};
    };
    if (subscriptions) {
      userInfo().then((response) => {
        const currentSubscription = subscriptions.find((subscription) => subscription.id === response.subscriptionId);
        setUser({...response, subscription: currentSubscription});
      });
    }

  }, [subscriptions]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <HeaderPublic items={user ? memberItems : []} />
      {!pathname.includes("account") ? (
        <> {children} </>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
            minHeight: "calc(100vh - 280px)",
          }}
          id="cont"
        >
          <UserSideBar />
          <Box sx={{ padding: "30px" }} id="user_wrapper">
            {user ? (
              <>
                <UserData user={user} />
                {children}
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
      <Footer />
    </div>
  );
};

export default UserLayout;
