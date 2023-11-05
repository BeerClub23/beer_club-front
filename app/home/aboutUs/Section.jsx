import { Container } from "@mui/material";
import styles from "./AboutUsSection.module.scss";
import React from "react";
import { AboutUsCard } from "../../components/aboutUsCard/AboutUsCard";

const Section = () => {
  return (
    <section id="nosotros" className={styles.aboutUsSection}>
      <Container>
        <h1 className={styles.aboutUsSection_title}>
          ¡Bienvenidos a Beer Club!
        </h1>
        <AboutUsCard />
      </Container>
    </section>
  );
};

export default Section;
