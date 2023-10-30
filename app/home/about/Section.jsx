'use client'
import React from 'react'
import { Container } from '@mui/material';
import AboutStepCard from '../../components/aboutCard/AboutCard'
import styles from './AboutSection.module.scss'
import {aboutSteps} from '../../services/about'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const AboutSection = () => {
  // const { data, isLoading, isError} = useGetAboutSteps();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 0,
    initialSlide: 0,
    arrows: true,
    responsive: [    
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 

  return (
    <section id='como-funciona' className={styles.aboutSection}>
        <Container>        
          <h2 className={styles.aboutSection_title }>
            Descubrí los beneficios de unirte a Beer Club
          </h2>
          <article className={styles.aboutSection_aboutArticle}> 
          <Slider className={styles.aboutSection_slicks}{...settings}>
            {aboutSteps.map((step, index)=>         
            <AboutStepCard
              key={index}
              data={step}
              />)}
          </Slider>  
          </article>    

      </Container>

     
    </section>
  )
}

export default AboutSection