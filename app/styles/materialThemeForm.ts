import { blueGrey, grey } from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";


export const theme = createTheme({
  
    
    typography: {
      fontFamily: 'Roboto, sans-serif',           
    },
    palette: {
    
      // palette values for dark mode
      mode:'dark',
<<<<<<< HEAD
      primary: {main: '#F5E1C1'},
=======
      primary: {
        main: '#CEB5A7',
        dark: '#907e74',
        light: '#d7c3b8'

      },
      secondary: {
        main: '#F5E1C1',
        dark: '#ab9d87',
        light: '#f7e7cd'
      },
>>>>>>> develop
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
