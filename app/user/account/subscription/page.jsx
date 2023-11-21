"use client";

import { Box, Button, Typography } from "@mui/material";
import "./Subscriptions.scss";
import { useUserBeerContext } from "@/app/context/user";
import { useGetSubscriptions } from "../../../services/subscriptions";
import SubscriptionCard from "../../../components/subscriptionCard/SubscriptionCard";


const AccountPage = () => {

  const { user } = useUserBeerContext();
  const { subscriptions } = useGetSubscriptions();

  return (
    <Box className="subscriptionContainer">
      {subscriptions.map((subscription) => subscription.id !== user.subscription.id ? (
        <SubscriptionCard
          key={subscription.name}
          action={() => goToRegister(subscription)}
          title={subscription.name}
          price={subscription.price}
          benefits={subscription.benefits}
          isRecommended={subscription.isRecommended}
          buttonText={'Cambiar'}
        ></SubscriptionCard>
      ) : (<></>))}
    </Box>
  );
};

export default AccountPage;
