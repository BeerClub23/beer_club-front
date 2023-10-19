import React from 'react'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/materialThemeForm';
import styles from './AboutCard.module.scss'

const AboutStepCard = ({data}) => {

  return (
    <ThemeProvider theme={theme}>
        <article className={styles.cardContainer}>
          <h3>{data.title}</h3>
          <div className={styles.iconContainer}>
            {data?.icon =="LoyaltyIcon"?<LoyaltyIcon color='primary' className={styles.icon}></LoyaltyIcon>:
            data?.icon =="CardMembershipIcon"?<CardMembershipIcon color='primary' className={styles.icon}></CardMembershipIcon>:
            data?.icon =="CardGiftcardIcon"?<CardGiftcardIcon color='primary' className={styles.icon}></CardGiftcardIcon>:
            <SportsBarIcon color='primary'className={styles.icon}></SportsBarIcon>}
          </div>
            <p className={styles.description}>{data.description}</p>
        </article>
    </ThemeProvider>
  )
}

export default AboutStepCard