"use client";
import Accordion from "../components/accordion/accordion";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Footer from "../components/footer/Footer";
import { Container } from "@mui/material";
import { useGetFaqs } from "../services/faqs";
import "./faqs.scss";
import { useState } from "react";
import AccordionWrapper from "../components/accordion/accordion";

const FaqsPage = () => {
  const { faqs, isLoading, isError } = useGetFaqs();
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
      <HeaderPublic />
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
