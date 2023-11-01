import { Alert, Button, Step, StepLabel, Stepper} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonalData from "./PersonalData";
import AddressData from "./AddressData";
import PaymentData from "./PaymentData";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
// import { ComicData } from "dh-marvel/features/marvel/comic.types";
import { useRouter } from "next/navigation";
import {theme} from '../../styles/materialThemeForm'
import ThemeProvider  from "@mui/material/styles/ThemeProvider";

const steps = [
    'Datos Personales',
    'Dirección de entrega',
    'Datos del pago',
  ];

export const FormCheckout = ({id    
    // , comic
}) => { 
    const router = useRouter()  
    const {handleSubmit, trigger} =useFormContext()
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('');
    
    const onSubmit = (data) => {  
              
        if(step === 1){
            setFormData({...formData, customer: data})
            
        }
        if(step === 2){
            setFormData({...formData, address: data})
           
        }        
        if(step === 3){
            
            console.log(JSON.stringify({...data}));
            router.push('/congratulations');
            // setFormData({...formData, card: data})   
        // fetch('http://localhost:3000/api/checkout', 
        // fetch('https://ctd-esp-fe3-final-claralisle.vercel.app/api/checkout', 
      /*  { 
        method: "POST",
        // body: JSON.stringify({...data, comic:1}),       
        body: JSON.stringify({...data}),          
        headers:{
            'Content-Type': 'application/json'
        }}
        )
        .then((response) => {
            console.log(response);
        if(response.status ===200){
            
            const nombre = JSON.stringify(data.customer.name);
            const apellido = JSON.stringify(data.customer.lastName);
            const direccion = JSON.stringify(data.address.address1);
            const ciudad = JSON.stringify(data.address.city);
            const provincia = JSON.stringify(data.address.state);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("apellido", apellido);
            localStorage.setItem("direccion", direccion);
            localStorage.setItem("ciudad", ciudad);
            localStorage.setItem("provincia", provincia);
            // router.push(`/confirmacion-compra/${id}`)
            router.push(`/congratulations`)
        }
       
        return response.json();
        
        })
        
        .then((data) => {  
            setStatus(data.message)      
      
        })
        .catch((error) => {           
            console.log(error);         
      
        });*/ 
        }
    };    

    /***************************************************** */
  
    /*const handlePrevStep = ()=>{        
        setStep(step - 1)
    }

    const handleNextStep = ()=>{    
        setStep(step + 1)
    }*/

    /***************************************************** */

    const handleNext = async() => {
        let isValidate= await trigger(["customer.name","customer.lastName","customer.dateOfBirth","customer.phoneNumber","customer.email", "customer.password", "customer.passwordConfirm"]);
        if(step == 1 && isValidate){
            // setFormData({...formData, customer: data})
            setStep((prevStep) => prevStep + 1)
        }
    };
    const handleNext2 = async() => {
        let isValidate= await trigger(["address.address1","address.address2","address.city","address.state","address.zipCode"]);
        if(step == 2 && isValidate){
            // setFormData({...formData, address: data})
            setStep((prevStep) => prevStep + 1)
        }
    };
    const handleNext3 = async() => {
        await trigger(["card.number","card.nameOnCard","card.expDate","card.cvc"]);
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };


	return (
        <>
        <ThemeProvider theme={theme}>
           <Box >
                <Stepper activeStep={step-1} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}  >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
               </Stepper>
            </Box>
            <Box sx={{maxWidth: "500px", margin: "0 auto"}}>
                <Paper
                    elevation={1}
                    sx={{p: "32px", display: "flex", flexDirection: "column", gap: 3, marginTop:'20px', marginBottom:'20px'}}
                >
                    {step==1 &&<Typography variant="h4" align="center">
                        Datos personales
                    </Typography>}
                    {step==2 && <Typography variant="h4" align="center">
                        Dirección de envio
                    </Typography>}
                    {step==3 && <Typography variant="h4" align="center">
                        Pago
                    </Typography>}                

                  <form onSubmit={handleSubmit(onSubmit)} >                        
                        {step==1 &&<PersonalData />}
                        {step==2 &&<AddressData/>}
                        {status && <Alert severity="error">{status}</Alert>} 
                        {step==3 &&<PaymentData/>}  
                       

                            <Box>
                              
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={step === 1}
                                sx={{margin: 2}}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                             >
                                Volver
                             </Button>
                            {step === 1 && <Button type="button" variant="contained" color="primary"sx={{margin: 2}} onClick={handleNext}>
                                    Siguiente
                                </Button>}
                            {step === 2 && <Button type="button" variant="contained" color="primary"sx={{margin: 2}} onClick={handleNext2}>
                                    Siguiente
                                </Button>}
                            {step === 3 && <Button type='submit'variant="contained" color="primary"sx={{margin: 2}} onClick={handleNext3}>
                                    Enviar
                                </Button>}
                            </Box>
                    </form>
                </Paper>
            </Box>
             </ThemeProvider>
        </>
	);
};