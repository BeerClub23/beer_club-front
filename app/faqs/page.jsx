'use client'
import Accordion from "../components/accordion/accordion";
import HeaderPublic from '../components/headerPublic/headerPublic'
import Footer from '../components/footer/Footer'
import { Container } from '@mui/material';
import { useGetFaqs } from "../services/faqs";
import './faqs.scss'
import { useState } from "react";

const FaqsPage = () => {
    const { faqs, isLoading, isError } = useGetFaqs();
    const [ activeQuestion, setActiveQuestion ] = useState();

    const setQuestion = (index) => {
        if (activeQuestion !== index) {
            setActiveQuestion(index);
        } else {
            setActiveQuestion(null)
        }
    }

    return (
        <>
            <HeaderPublic/>
            <div className="bc-faqs-container">
                <Container>
                    <h2>Resuelve tus dudas</h2>
                    {
                        faqs.map((faq, index) => <Accordion key={index} title={faq.question} content={faq.answer} isActive={activeQuestion === index} setQuestion={() => setQuestion(index)}></Accordion>)
                    }
                </Container>
            </div>
            
            <Footer/>
        </>
        
    )
}

export default FaqsPage