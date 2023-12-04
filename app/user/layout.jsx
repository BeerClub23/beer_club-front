"use client";
import "../globals.scss";
import React, { useEffect } from "react";
import Footer from "../components/footer/Footer";
import HeaderPublic from "../components/headerPublic/headerPublic";
import { deleteUser, getUserInfo } from "../services/user";
import Cookies from "js-cookie";
import UserSideBar from "../components/userSideBar/UserSideBar";
import UserData from "../components/userBasicData/UserBasicData";
import { Box } from "@mui/material";
import { useUserBeerContext } from "../context/user";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { memberItems } from "../common/constants/NavBarItems";
import { useGetSubscriptions } from "../services/subscriptions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const UserLayout = ({ children }) => {
  const pathname = usePathname();
  const { user, setUser } = useUserBeerContext();
  const { subscriptions, isLoading, isError } = useGetSubscriptions();

  const token = Cookies.get("jwt");
  const decodeToken = token ? jwtDecode(token.toString()) : null;
  const router = useRouter();

  useEffect(() => {
    const userInfo = async () => {
      return decodeToken ? await getUserInfo(decodeToken.email, token) : {};
    };
    if (subscriptions) {
      userInfo().then((response) => {
        const currentSubscription = subscriptions.find(
          (subscription) => subscription.id === response.subscriptionId,
        );
        let nextSubscription;
        if (response.nextSubscriptionId) {
          nextSubscription = subscriptions.find(
            (subscription) => subscription.id === response.nextSubscriptionId,
          );
        }
        setUser({
          ...response,
          subscription: currentSubscription,
          nextSubscription,
        });
        console.log(user);
      });
    }
  }, [subscriptions]);

  // Handle deactivate user account
  const handleDeactivateAccount = async () => {
    let timerInterval;
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A9A9A9",
      cancelButtonColor: "#ceb5a7",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("userId: " + user.id);
          let response = await deleteUser(user.id, token);

          if (response.status === 204) {
            Swal.fire({
              title: "Cuenta desactivada",
              text: "Tu cuenta ha sido desactivada exitosamente.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#ceb5a7",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "¡Gracias por haber sido parte de Beer Club!",
                  timer: 2000,
                  showConfirmButton: false,
                  didOpen: () => {
                    timerInterval = setInterval(() => {
                      const timer = Swal.getPopup().querySelector("b");
                      if (timer) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
                // Logout logic - add delay
                setTimeout(() => {
                  Cookies.remove("jwt");
                  setUser(null);
                  router.push("/home");
                }, 2000);
              }
            });
          } else {
            // Handle other response statuses (e.g., 404, 500) or error responses
            const error = Object.keys(response.response.data).reduce(
              (acc, key) => `${acc}${response.response.data[key]}\n`,
              "",
            );
            Swal.fire({
              title: "Error!",
              text: error || "Unexpected error occurred.",
              icon: "error",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#ceb5a7",
              focusConfirm: false,
            });
          }
        } catch (error) {
          // Handle errors that occur during the request (e.g., network error)
          Swal.fire({
            title: "Error!",
            text: "Unexpected error occurred.",
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#ceb5a7",
            focusConfirm: false,
          });
        }
      }
    });
  };
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
          <UserSideBar handleDeactivateAccount={handleDeactivateAccount} />
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
