"use client";
import { useEffect, useState } from "react";
import { getRecommendationBySubscriptionIdAndDate } from "../../services/recommendation";
import Cookies from "js-cookie";
import { useUserBeerContext } from "../../context/user";

const RecommendationPage = () => {
  const token = Cookies.get("jwt");
  const { user } = useUserBeerContext();
  const [recommendation, setRecommendation] = useState();

  useEffect(() => {
    if (user) {
      const getCurrentRecommendation = async () =>
        await getRecommendationBySubscriptionIdAndDate(
          user.subscription.id,
          token,
        );
      getCurrentRecommendation().then((response) =>
        setRecommendation(response),
      );
      console.log(recommendation);
    }
  }, [user, recommendation, token]);

  return <div style={{ minHeight: "100vh" }}>Aqui Recommendaciones</div>;
};

export default RecommendationPage;
