import Footer from '../components/footer/Footer.jsx'
import HeaderPublico from '../components/headerPublico/headerPublico'
import { Container, Typography } from '@mui/material'
import SubscriptionsSection from './subscriptions/section'

export default function Home() { 
  return (
  <> 
    <HeaderPublico/>
    <Container>
     
    </Container>
    <SubscriptionsSection ></SubscriptionsSection>
    <Footer/> 
    
  </>
  )
}