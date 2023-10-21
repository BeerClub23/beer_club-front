'use client'
import React from 'react'
import { useGetAboutSteps } from '../../services/about';
import { Container } from '@mui/material';
import AboutStepCard from '../../components/aboutCard/AboutCard'
import styles from './AboutSection.module.scss'

const AboutSection = () => {
  const { data, isLoading, isError} = useGetAboutSteps();
  
 
  return (
    <section className={styles.aboutSection}>
    
         <h2 className={styles.aboutSection_title }>
          Descubrí los beneficios de unirte a Beer Club
        </h2>
        <article className={styles.aboutSection_aboutArticle}> 
          {data.map((step, index)=>         
          <AboutStepCard
            key={index}
            data={step}
            />)}
        </article>    

     
    </section>
  )
}

export default AboutSection