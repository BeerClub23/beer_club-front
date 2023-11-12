"use client";
import React from "react";
import "./SubscriptionSection.scss";
import SubscriptionCard from "../../components/subscriptionCard/SubscriptionCard";
import { useAppContext } from "../../context/context";
import { useRouter } from "next/navigation";
import { useGetSubscriptions } from "../../services/subscriptions";
import { Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SubscriptionsSection = () => {
  const { context, setContext } = useAppContext();
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true,
    mobileFirst: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const goToRegister = (subscription) => {
    setContext({ ...context, subscription });

    router.push(`/planes`);
  };

  return (
    <div className="bc-subscription-section-container">
      <Container>
        <h2 className="bc-subscription-section__title">
          Elige según tu nivel de experticia
        </h2>
        <section className="bc-subscription-section" id="suscribirse">
          <Slider {...settings}>
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.name}
                action={() => goToRegister(subscription)}
                title={subscription.name}
                price={subscription.price}
                benefits={subscription.benefits}
                isRecommended={subscription.isRecommended}
              ></SubscriptionCard>
            ))}
          </Slider>
        </section>
      </Container>
    </div>
  );
};

export default SubscriptionsSection;
