import React from "react";
import { Typography } from "@mui/material";
import "./BenefitCard.scss";
import chop from "../../../public/images/aboutUs/black-trigo.png";
import Image from "next/image";
import SportsBarIcon from '@mui/icons-material/SportsBar';

const Benefit = ({ description }) => {
  return (
   
      
      <Typography data-aos="fade-up" className="benefitText">
       <SportsBarIcon className="beerIcon"></SportsBarIcon> {description}</Typography>
   
  );
};

export default Benefit;
