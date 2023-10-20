import HeaderPublic from '../components/headerPublic/headerPublic'
import Footer from '../components/footer/Footer.jsx'
import { Container, Typography } from '@mui/material'
import SubscriptionsSection from './subscriptions/section'
import Box from '@mui/material/Box';

export default function HomePage() { 
  return (
  <> 
    <HeaderPublic/>
    <Box component="main" sx={{ pt: 13 }}>
      <SubscriptionsSection />
    </Box>
    <Footer/> 
    
  </>
  )
}