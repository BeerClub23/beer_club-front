import { Container } from '@mui/material'
import styles from './AboutUsSection.module.scss'
import React from 'react'
import logo from '../../../public/images/logo/Logo_sin_escudo_Negro.svg'
import img from '../../../public/images/aboutUs/aboutUs.jpg'
import Image from 'next/image'


const Section = () => {
   
  return (
    <section className={styles.aboutUsSection}>
                
                  
               
        <Container className={styles.aboutUsSection_container} >

            <h1 className={styles.aboutUsSection_title}>¡Bienvenidos a Beer Club!</h1> 
            <article className={styles.aboutUsSection_containerArticle}>
             <Image src={logo} width={200} height={200} alt='logo'  className={styles.aboutUsSection_logo} />   
                <div className={styles.aboutUsSection_textContainer}>
                    <p className={styles.aboutUsSection_text}>Imagina un mundo donde cada sorbo es una nueva aventura, donde cada cerveza es una puerta a un universo de sabores, aromas y tradiciones. Al unirte a nosotros, te sumerges en un mundo de descubrimiento y camaradería, donde recibes mensualmente una selección curada de cervezas artesanales de todo el mundo en tu puerta. Pero Beer Club es más que un servicio de entrega de cervezas; organizamos eventos exclusivos, catas virtuales con cerveceros destacados y te conectamos con otros miembros apasionados.</p>
                    <p className={styles.aboutUsSection_text}>Si estás listo para unirte a una comunidad que celebra la diversidad de la cerveza y experimentar un mundo de sabores y amistades que solo los verdaderos amantes de la cerveza pueden disfrutar, entonces Beer Club es tu destino cervecero definitivo. </p>
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