import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Benefit from "../../components/benefit/BenefitCard";
import "./BenefitSection.scss";
import chop from "../../../public/images/aboutUs/black-chop.png";
import Image from "next/image";


const BenefitSection = ({ benefits }) => {
  const uniqueBenefits = benefits?.filter(
    (benefit, index, self) =>
      index === self.findIndex((b) => b.id === benefit.id),
  );

  return (
    <section className="sectionBenefit">

    <Container className="benefitContainer">
        <Image
          src={chop}
          // width={98}
          // height={200}
          width={100}
          height={142}
          alt="logo"
          className="logo1"
        />
        <Image
          src={chop}
          // width={98}
          // height={200}
          width={100}
          height={142}
          alt="logo"
          className="logo2"
        />

      <Box className="infoBenefit">
        {uniqueBenefits && (
          <>
            <Typography className="titleBenefit">
              Aprovecha los beneficios de este mes:
            </Typography>
            <Box className="articleBenefit">
              {uniqueBenefits.map((benefit, index) => (
                <Benefit key={index} description={benefit.name} />
              ))}
            </Box>
          </>
        )}
      </Box>
      </Container>
    </section>
  );
};
export default BenefitSection;
