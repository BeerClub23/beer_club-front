import { Alert, Button, Step, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonalData from "./PersonalData";
import AddressData from "./AddressData";
import PaymentData from "./PaymentData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { theme } from "../../styles/materialThemeFormCheckout";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import logo from "../../../public/images/logo/Logo_sin_escudo_Negro.svg";
import Image from "next/image";
import ApiRegister from "@/app/services/register";
import Swal from "sweetalert2";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

export const FormCheckout = ({ category }) => {
  const router = useRouter();
  const { handleSubmit, trigger } = useFormContext();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({ category: category.title });
    }
  }, []);

  const handleClick = () => {
    router.push("/bienvenido");
  };

  const onSubmit = async (data) => {
    if (step === 1) {
      setFormData({ ...formData, customer: data });
    }

    if (step === 2) {
      setFormData({ ...formData, address: data });
    }
    if (step === 3) {
      console.log(JSON.stringify({ ...formData, ...data }));
      setFormData({ ...formData, ...data });
      Swal.fire({
        title: "Procesando el pago",
        html: "Por favor, espere...",
        allowOutsideClick: false,
        showConfirmButton: false, // Ocultar el botón de confirmación
        onBeforeOpen: () => {
          Swal.showLoading();
    },
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      let response = await ApiRegister(data);
      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        Swal.fire({
          title: "Pago Aceptado!",
          text: `${response.data.message}`,
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          // onClick: handleClick(),
          focusConfirm: false,
        }).then(function () {
          window.location = "/login";
        });
      } else if (response.status !== 200) {
        console.log(response.response.data.message);
        Swal.fire({
          title: "Error!",
          text: `${response.response.data.message}`,
          icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      }
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

  const handleNext = async () => {
    let isValidate = await trigger([
      "customer.name",
      "customer.lastName",
      "customer.dateOfBirth",
      "customer.phoneNumber",
      "customer.email",
      "customer.password",
      "customer.passwordConfirm",
    ]);
    if (step == 1 && isValidate) {
      // setFormData({...formData, customer: data})
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleNext2 = async () => {
    let isValidate = await trigger([
      "address.address1",
      "address.address2",
      "address.city",
      "address.state",
      "address.zipCode",
    ]);
    if (step == 2 && isValidate) {
      // setFormData({...formData, address: data})
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleNext3 = async () => {
    await trigger([
      "card.number",
      "card.nameOnCard",
      "card.expDate",
      "card.cvc",
    ]);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Stepper
            sx={{ margin: "20px" }}
            activeStep={step - 1}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
          <Paper
            elevation={1}
            sx={{
              p: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginBottom: "20px",
            }}
          >
            <Typography variant="p" align="center" sx={{ padding: "-32px" }}>
              <Image
                src={logo}
                width={80}
                heigth={80}
                alt="imagen"
                sx={{ margin: "0 auto" }}
              ></Image>
            </Typography>
            {step == 1 && (
              <Typography variant="h4" align="center" sx={{ margin: "0" }}>
                Datos personales
              </Typography>
            )}

            {step == 2 && (
              <Typography variant="h4" align="center">
                Dirección de envio
              </Typography>
            )}
            {step == 3 && (
              <Typography variant="h4" align="center">
                Pago
              </Typography>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {step == 1 && <PersonalData />}
              {step == 2 && <AddressData />}
              {status && <Alert severity="error">{status}</Alert>}
              {step == 3 && <PaymentData />}

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={step === 1}
                  sx={{ margin: 2 }}
                  onClick={handleBack}
                  // sx={{ mr: 1 }}
                >
                  Volver
                </Button>
                {step === 1 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ margin: 2 }}
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                )}
                {step === 2 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ margin: 2 }}
                    onClick={handleNext2}
                  >
                    Siguiente
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ margin: 2 }}
                    onClick={handleNext3}
                  >
                    Enviar
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};
