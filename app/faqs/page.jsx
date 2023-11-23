"use client";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import { Container } from "@mui/material";
import { useGetFaqs } from "../services/faqs";
import "./faqs.scss";
import { useState } from "react";
import AccordionWrapper from "../components/accordion/accordion";
import { homeItems } from "../common/constants/NavBarItems";

const FaqsPage = () => {
  const { faqs } = useGetFaqs();
  const [activeQuestion, setActiveQuestion] = useState();

  const setQuestion = (index) => {
    if (activeQuestion !== index) {
      setActiveQuestion(index);
    } else {
      setActiveQuestion(null);
    }
  };

  return (
    <>
      <HeaderPublic items={homeItems} />
      <div className="bc-faqs-container">
        <Container>
          <h1 className="bc-faqs-container_title">Resuelve tus dudas</h1>
          {faqs.map((faq, index) => (
            <AccordionWrapper
              key={index}
              title={faq.question}
              content={faq.answer}
              isActive={activeQuestion === index}
              setQuestion={() => setQuestion(index)}
            ></AccordionWrapper>
          ))}
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default FaqsPage;
