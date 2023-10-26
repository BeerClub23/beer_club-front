
import React from 'react'
import styles from './BannerSection.module.scss'


const BannerSection = () => {
  return (
    
        <section className={styles.bannerContainer}>
          <div className={styles.bannerContainer_title}>
          
            <h1>Beer Club</h1>

          </div>
          <h2 className={styles.bannerContainer_slogan}>Un Viaje a Través de los Sabores Cerveceros</h2>           

        </section>
   
  )
}

export default BannerSection