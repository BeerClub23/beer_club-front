import { Button, Container, Typography } from '@mui/material';

import Box from '@mui/material/Box';

export default function Terms() { 
  return (
  <>     
    <Box  sx={{ pt: 13, backgroundColor: '#fff', minHeight:'100vh'}} >
        <Container>
            <Typography variant="h4"color='text.secondary' sx={{paddingTop:'10px', fontWeight:"bold"}}>Términos y condiciones.</Typography> 
            <Typography  sx={{paddingTop:'10px'}}variant="subtitle1" display="block"  align='justify' color='text.secondary' >Las presentes condiciones regulan el acceso, descarga y uso de la página web y/o aplicación en la que está navegando (en adelante, de manera conjunta, el “Sitio Web”), propiedad de Beer Club. (en adelante, “Beer Club ”). Estas condiciones regulan asimismo el acceso, descarga y uso de cualquier otra información, texto, gráficos, fotos, imágenes, música, etc. a los que se pueda acceder desde el Sitio Web (en adelante, el “Contenido”). 
            En cumplimiento de lo dispuesto  en el artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, Beer Club , titular de la Página  Web y de su Contenido, pone a disposición de los usuarios de este Sitio Web con residencia o acceso desde el territorio Argentino, la siguiente información de carácter general: </Typography> 
            <Typography variant="subtitle1" color='text.secondary' >
                -   Denominación social: Beer Club. 
            </Typography> 
            <Typography variant="subtitle1" color='text.secondary' >
                -   Domicilio social: Argentina - Colombia
            </Typography> 
            <Typography variant="subtitle1" color='text.secondary' >
                -   Número de identificación Fiscal: A-28006013  
            </Typography> 
            <Typography variant="h6"color='text.secondary' sx={{paddingTop:'10px', fontWeight:"bold"}}>Objeto:</Typography>
            <Typography variant="subtitle1" color='text.secondary' sx={{paddingTop:'10px'}} align='justify'>
                 El acceso y el uso del Sitio Web se regirán y quedarán sujetos a las presentes condiciones de uso. La utilización del Sitio Web atribuye la condición de “Usuario”. 
            </Typography>   
            <Typography variant="subtitle1" color='text.secondary' sx={{paddingTop:'10px'}} align='justify'>
                No obstante, Beer Club se reserva el derecho a modificar en cualquier momento las presentes condiciones, por lo que el Usuario debe leer detenidamente los mismos cada vez que acceda al Sitio Web para ser conocedor del alcance y/o cualquier modificación que se haya producido. Al acceder al Sitio Web y el Contenido con posterioridad a la publicación de dichas modificaciones, alteraciones o actualizaciones, el Usuario acepta cumplir con las nuevas condiciones. 
              </Typography>                 
              <Typography variant="subtitle1" color='text.secondary' sx={{paddingTop:'10px'}} align='justify'>
                  Cualquier disposición de las presentes condiciones que sea o devengue nula, anulable, ilegal o inexigible será excluida y considerada inaplicable, siendo sustituida por otra similar a la anterior, pero que no afecte o perjudique a las restantes disposiciones que permanecerán al margen y, por el contrario, plenamente vigentes.   
            </Typography> 
            <Typography variant="h6"color='text.secondary' sx={{paddingTop:'10px', fontWeight:"bold"}}>Acceso:</Typography>
            <Typography variant="subtitle1" color='text.secondary' sx={{paddingTop:'10px'}} align='justify'>
            Está prohibido el acceso a este Sitio Web a todas aquellas personas que sean menores de 18 años (el Usuario, mediante el registro, garantiza que tiene, al menos, 18 años), o siendo de mayor edad no puedan ser destinatarios de información relacionada con bebidas alcohólicas de conformidad con la legislación del domicilio desde el que accedan al Sitio Web 
            </Typography>   
            <Typography variant="h6"color='text.secondary' sx={{paddingTop:'10px', fontWeight:"bold"}}>Contenido:</Typography>
            <Typography variant="subtitle1" color='text.secondary' sx={{paddingTop:'10px'}} align='justify'>
              Beer Club se reserva, sin necesidad de previo aviso y en cualquier momento, el derecho  a suspender con carácter temporal o definitivo el acceso al Sitio Web, así como a todo o parte de su Contenido y a efectuar las modificaciones que considere oportunas en el mismo. 
              En relación con el Contenido ofrecido por Beer Club de buena fe, dada la gran cantidad de información que se ofrece, algunas de estas informaciones pueden no ser totalmente exactas o estar desactualizadas, si bien Beer Club hace importantes esfuerzos para que no sea así. 
            </Typography> 
               
              
        </Container>

  

    </Box>
    
  </>
  )
}