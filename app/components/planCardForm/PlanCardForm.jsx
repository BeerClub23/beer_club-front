import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {theme} from '../../styles/materialThemeForm'
import ThemeProvider  from "@mui/material/styles/ThemeProvider";

const PlanCardForm = () => {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ minWidth: 200, maxWidth:'500px', margin:'0 auto'}}>
      <CardContent>
        <Typography sx={{ fontSize: 16, fontWeight:'600' }} color="text.primary" gutterBottom>
          Tu Plan: Novato
        </Typography>
        <Typography variant="h5" component="div">          
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize:'1rem', fontWeight:'500' }} color="text.secondary">
          $100 Mensuales
        </Typography>
        <Typography variant="body2" color="text.secondary">
          *Envio gratis
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button sx={{ margin:'0 auto'}} size="small">Detalles</Button>
      </CardActions> */}
    </Card>
    </ThemeProvider>
  );
}

export default PlanCardForm