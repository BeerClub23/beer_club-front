import React from "react";
import { Box, Typography } from "@mui/material";
import "./BenefitCard.scss";
import Image from "next/image";

const Benefit = ({ description, background }) => {
  return (
    <Box className="benefitCardContainer">
      <Image
        src={background}
        fill={true}
        objectFit="cover"
        // height={300}
        // width={300}
        alt="imagen"
        className="benefitBackground"
      ></Image>
      <Box className="benefitBackgroundOverlay"></Box>
      <Typography data-aos="fade-up" className="benefitsText">
        {description}
      </Typography>
    </Box>
  );
};

export default Benefit;
