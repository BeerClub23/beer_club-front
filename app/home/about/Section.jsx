'use client'
import React from 'react'
import { useGetAboutSteps } from '../../services/about';
import { Container } from '@mui/material';
import AboutStepCard from '../../components/aboutCard/AboutCard'
import styles from './AboutSection.module.scss'
import {aboutSteps} from '../../services/about'

const AboutSection = () => {
  // const { data, isLoading, isError} = useGetAboutSteps();
  
 
  return (
    <section id='como-funciona' className={styles.aboutSection}>
          <h2 className={styles.aboutSection_title }>
            Descubrí los beneficios de unirte a Beer Club
          </h2>
        <Container>        
          <article className={styles.aboutSection_aboutArticle}> 
            {aboutSteps.map((step, index)=>         
            <AboutStepCard
              key={index}
              data={step}
              />)}
          </article>    

      </Container>

     
    </section>
  )
}

export default AboutSection