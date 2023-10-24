import { Typography } from '@mui/material';
import Footer from '../components/footer/footer'
import HeaderPublic from '../components/headerPublic/headerPublic'
import Box from '@mui/material/Box';

export default function MenorPage() { 
  return (
  <> 
    
    <Box component="main" sx={{ pt: 13 }}>
        <Typography variant="h4">Lo sentimos, pero esta web es solo para mayores de 18 años. Te esperamos cuando seas mayor.</Typography> 
    </Box>
    
  </>
  )
}