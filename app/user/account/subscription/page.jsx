"use client";

import { Box } from "@mui/material";
import "./Subscriptions.scss";
import { useUserBeerContext } from "../../../context/user";
import { useGetSubscriptions } from "../../../services/subscriptions";
import SubscriptionCard from "../../../components/subscriptionCard/SubscriptionCard";
import { updateUserSubscription } from "../../../services/user";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const AccountPage = () => {
  const { user } = useUserBeerContext();
  const { subscriptions } = useGetSubscriptions();
  const token = Cookies.get("jwt");

  const updateSubscription = (subscription) => {
    updateUserSubscription(
      { user_id: user.id, new_subscription_id: subscription.id },
      token,
    )
      .then((response) => {
        // console.log(response);
        Swal.fire({
          title: "Subscripción actualizada!",
          text: "Recuerda que el cambio de subscripción se verá reflejado en la siguiente factura. Asi mismo en la visualización del contenido.",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          // onClick: handleClick(),
          focusConfirm: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error,
          imageAlt: "No pudo actualizar tu subscripción. Intenta más tarde!",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          icon: "error",
          focusConfirm: false,
        });
      });
  };

  return (
    <Box className="subscriptionContainer">
      {subscriptions.map((subscription) =>
        subscription.id !== user.subscription.id ? (
          <SubscriptionCard
            key={subscription.name}
            action={() => updateSubscription(subscription)}
            title={subscription.name}
            price={subscription.price}
            benefits={subscription.benefits}
            isRecommended={subscription.isRecommended}
            buttonText={"Cambiar"}
          ></SubscriptionCard>
        ) : (
          <></>
        ),
      )}
    </Box>
  );
};

export default AccountPage;
