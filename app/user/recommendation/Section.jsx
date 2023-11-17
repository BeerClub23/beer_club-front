"use client";
import React from "react";
import "./RecommendationSection.scss";
import { Container, Typography, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AboutCard } from "@/app/components/aboutCard/AboutCard";

const RecommendationSection = ({ recommendation }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const recommendations = recommendation.split(".");

  console.log(recommendations);
  return (
    <section className="recommendationSection">
      <Container className="container">
        <Typography variant="h3" className="title">
          Recomendaciones del sommelier:
        </Typography>

        <Box className="textContainerRec">
          {recommendations.map((info, index) => (
            <p key={index} className="recommText">
              {info}
            </p>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default RecommendationSection;
