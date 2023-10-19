import Footer from '../components/footer/footer'
import HeaderPublico from '../components/headerPublico/headerPublico'
import { Container, Typography } from '@mui/material'
import SubscriptionsSection from './subscriptions/section'
import AboutSection from './about/Section'

export default function Home() { 
  return (
  <> 
    <HeaderPublico/>
    <Container>
     
    </Container>
    <AboutSection/>
    <SubscriptionsSection ></SubscriptionsSection>

    <Footer/> 
    
  </>
  )
}