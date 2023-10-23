import { Container } from '@mui/material'
import styles from './AboutUsSection.module.scss'
import React from 'react'
import logo from '../../../public/images/logo/Logo_sin_escudo_Negro.svg'
import img from '../../../public/images/aboutUs/aboutUs.jpg'
import Image from 'next/image'


const Section = () => {
   
  return (
    <section className={styles.aboutUsSection}>
        <Container>

            <Image src={logo} width={56} height={56} alt='logo'  className={styles.aboutUsSection_logo}/>   
            <h1 className={styles.aboutUsSection_title}>¡Bienvenidos Beer Club!</h1> 
            <article className={styles.aboutUsSection_container}>
                <div className={styles.aboutUsSection_textContainer}>
                    <p className={styles.aboutUsSection_text}>En Beer Club somos una comunidad apasionada por la cerveza, compartiendo un profundo aprecio por la artesanía y diversidad de esta bebida milenaria. Nuestra historia comenzó con un grupo de entusiastas de la cerveza que anhelaban llevar la experiencia cervecera a un nivel superior, y así surgió Beer Club.</p>
                    <p className={styles.aboutUsSection_text}>Nuestra misión es brindarte acceso a cervezas excepcionales y enriquecer tu vida cervecera. Unite a nosotros en esta emocionante travesía cervecera.</p>
                    <p className={styles.aboutUsSection_spanText}><span >... y salud a la pasión por la cerveza!</span></p>
                </div>
                <div className={styles.aboutUsSection_image}>
                    {/* <Image src={img} width={200} height={200} alt='logo' />    */}
                </div>

            </article>
            
              
        </Container>
                 
    </section>
  )
}

export default Section