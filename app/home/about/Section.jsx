'use client'
import React from 'react'
import { useGetAboutSteps } from '../../services/about';
import { Container } from '@mui/material';
import AboutStepCard from '../../components/aboutCard/AboutCard'
import styles from './AboutSection.module.scss'

const AboutSection = () => {
  const { data, isLoading, isError} = useGetAboutSteps();
  
 
  return (
    <section >
      <Container>
        <h2 className={styles.title }>
          Descubrí los beneficios de unirte a Beer Club
        </h2>
        <div className={styles.aboutSection}> 
          {data.map((step, index)=>         
          <AboutStepCard
            key={index}
            data={step}
            />)}
        </div>
      </Container>
    </section>
  )
}

export default AboutSection