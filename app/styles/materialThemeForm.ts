import { blueGrey, grey } from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";


export const theme = createTheme({
  
    
    typography: {
      fontFamily: 'Roboto, sans-serif',           
    },
    palette: {
    
      // palette values for dark mode
      mode:'dark',
      primary: {main: '#F5E1C1'},
      divider: blueGrey[700],
      background: {
        default: grey[1000],
        paper: grey[900],    
    },      
    text: {
        primary: '#fff',
        secondary: grey[500],       
    },
      
    }, 
   components:{
     MuiOutlinedInput: {
      styleOverrides:{
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #292929 inset;',
            WebkitTextFillColor: '#fff',
            
          },
        },

      }
     },

   }
    /*  components: {
         MuiInputBase:{
         // MuiTextField: {
           styleOverrides:{  
         
             root: {
               '&.Mui-focused':{
                 backgroundColor: 'yellow', 
           },   
               '&.Mui-filled':{
                 backgroundColor: 'transparent !important', 
           }             
             
             },
           }
         },
       },*/
    
   
});
