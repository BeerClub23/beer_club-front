"use client";
import "./planes.scss";
import { Button, Container, Typography } from "@mui/material";
import Footer from "../components/footer/Footer";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Box from "@mui/material/Box";
import PlanCard from "../components/plan/planCard/PlanCard";
import { useAppContext } from "../context/context";
import { useGetSubscriptions } from "../services/subscriptions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PlanDetail from "../components/plan/planDetail/PlanDetail";
import { theme } from "../styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";
import { homeItems } from "../common/constants/NavBarItems";


const PlansPage = () => {
  const { context, setContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const initialSelectedValue =
    context && context.subscription ? context.subscription.id : 1;
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  const router = useRouter();
  const recommendedPlan = findNextHigherPriceId(selectedValue, subscriptions);

  const handleCardSelect = (cardId) => {
    setSelectedValue(cardId);
  };

  const submitSelection = () => {
    const selectedSubscription = subscriptions.find(
      (subscription) => subscription.id === selectedValue,
    );
    setContext({ subscription: selectedSubscription });
    router.push("/registro");
  };
  return (
    <>
      <HeaderPublic items={homeItems} />
      <Box
        className="mainBox"
        sx={{ pt: 15, pb: 10, backgroundColor: "#ffffff", color: "black" }}
      >
        <Container>
          <Typography pt={5} variant="h2" className="title" fontWeight={600}>
            Plan <span>actual</span>
          </Typography>
          <Box mt={5} className="boxContainer" sx={{ display: "flex" }}>
            <Box flex={0.6} p={2} className="boxList">
              <PlanDetail subscription={subscriptions[selectedValue - 1]} />
              {/* <Button
                className="confirmBtn"
                sx={{
                  height: "10%",
                  fontWeight: "bold",
                  color: "black",
                  backgroundColor: "#ceb5a7",
                }}
                onClick={submitSelection}
              >
                Confirmar
              </Button> */}
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={submitSelection}
                  sx={{
                    pt: "7px",
                    mx: "auto",
                    mt: 1,
                    mb: 4,
                    fontWeight: "bold",
                    width: "460px",
                  }}
                >
                  Confirmar
                </Button>
              </ThemeProvider>
            </Box>
            <Box m={"auto"} flex={0.4} textAlign={"left"} className="boxPlan">
              <Typography className="subtitle" variant="h5" sx={{ mb: 2 }}>
                Deseas cambiar tu selección?
              </Typography>
              {subscriptions.map((plan) => (
                <PlanCard
                  key={plan.id}
                  id={plan.id}
                  title={plan.name}
                  price={plan.price}
                  benefit={plan.benefits[0].name}
                  isRecommended={recommendedPlan}
                  isChecked={selectedValue == plan.id}
                  event={handleCardSelect}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
function findNextHigherPriceId(id, subscriptions) {
  const currentSubscription = subscriptions.find(
    (subscription) => subscription.id === id,
  );
  const currentPrice = parseInt(currentSubscription.price);
  for (
    let i = subscriptions.indexOf(currentSubscription) + 1;
    i < subscriptions.length;
    i++
  ) {
    const subscription = subscriptions[i];
    const subscriptionPrice = parseInt(subscription.price);
    if (subscriptionPrice > currentPrice) {
      return subscription.id;
    }
  }

  return null;
}

export default PlansPage;
