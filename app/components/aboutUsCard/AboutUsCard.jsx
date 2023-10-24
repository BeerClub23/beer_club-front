import Image from 'next/image'
import React from 'react'
import styles from '../aboutUsCard/AboutUsCard.module.scss'
import logo from '../../../public/images/logo/Logo_sin_escudo_Negro.svg'
import lupulo from '../../../public/images/aboutUs/lupulo.png'

export const AboutUsCard = () => {
  return (
      <article  className={styles.containerArticle}  >
        {/* <Image src={logo} width={200} height={200} alt='logo'  className={styles.containerArticle_logo} />    */}
                <div className={styles.containerArticle_textContainer}  data-aos="fade-up">
                    <p className={styles.containerArticle_text}>Imagina un mundo donde cada sorbo te lleva a una emocionante aventura, donde cada cerveza te abre la puerta a un universo lleno de sabores, fragancias y tradiciones. Cuando te unes a nosotros, te sumerges en un lugar lleno de descubrimientos y buenos momentos. Cada mes, recibirás en tu puerta una cuidadosa selección de cervezas artesanales de todo el mundo. Pero Beer Club es mucho más que un simple servicio de entrega de cervezas. Organizamos eventos exclusivos, catas virtuales con cerveceros destacados y te conectamos con otros miembros apasionados.</p>
                    <p className={styles.containerArticle_text}>Si estás listo para unirte a una comunidad que celebra la diversidad de la cerveza y explorar un mundo de sabores y amistades, que solo los auténticos amantes de la cerveza pueden disfrutar, entonces Beer Club es tu destino cervecero definitivo. </p>
                    <p className={styles.containerArticle_spanText}><span >... y salud a la pasión por la cerveza!</span></p>
                </div>
                 <div className={styles.containerArticle_image} data-aos="fade-down"> 
                    <Image src={lupulo} alt='logo' />   
                </div>
    </article>
  )
}
