/* eslint-disable prettier/prettier */
import { Alert, Button, Step, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonalData from "./PersonalData";
import AddressData from "./AddressData";
import PaymentData from "./PaymentData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { theme } from "../../styles/materialThemeFormCheckout";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import logo from "../../../public/images/logo/Logo_sin_escudo_Negro.svg";
import Image from "next/image";
import ApiRegister from "@/app/services/register";
import Swal from "sweetalert2";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

export const FormCheckout = ({ category }) => {
  // const router = useRouter();
  const { handleSubmit, trigger , formState: { isSubmitting }} = useFormContext();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({ category: category.id });
    }
  }, []);

  if(isSubmitting){
    console.log(isSubmitting);
    Swal.fire({
      title: "Procesando el pago",
      html: "Por favor, espere...",
      allowOutsideClick: false,
      showConfirmButton: false, // Ocultar el botón de confirmación
      onBeforeOpen: () => {
        Swal.showLoading();
  },
    });
  }

 const onSubmit = async (data) => { 

    if (step === 1) {
      setFormData({ ...formData, customer: data });
    }

    if (step === 2) {
      setFormData({ ...formData, address: data });
    }
    if (step === 3) {
        setFormData({ ...formData, card: {
        cardNumber:data.card.cardNumber,
        expDate: data.card.expDate,
        cardHolder: data.card.cardHolder,
        cvv: data.card.cvc
      }, });
    /* Swal.fire({
        title: "Procesando el pago",
        html: "Por favor, espere...",
        allowOutsideClick: false,
        showConfirmButton: false, // Ocultar el botón de confirmación
        onBeforeOpen: () => {
          Swal.showLoading();
    },
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));*/
      const normalizedData = {   
          subscriptionId:category.id,          
          ...data.customer,
          ...data.address,
          cardNumber:data.card.cardNumber,
          expDate: data.card.expDate,
          cardHolder: data.card.cardHolder,
          cvv: data.card.cvc       
      };
      
      let response = await ApiRegister(normalizedData);
      console.log(normalizedData);     
      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        Swal.fire({
          title: "Pago Aceptado!",
          html: `Factura: ${response.data.invoiceNumber} <br/> Importe: ${response.data.amount}`,
          // text: `Factura: ${response.data.invoiceNumber}, Importe: ${response.data.invoiceNumber}`,
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
          imageUrl: "../../images/icons/no-beer.jpg",
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "No puede ingresar",
          // icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      }     
    }
  };

  const handleNext = async () => {
    let isValidate = await trigger([
      "customer.name",
      "customer.lastName",
      "customer.birthdate",
      "customer.telephone",
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
      "address.street",
      "address.number",
      "address.country",
      "address.city",
      "address.province",
      "address.zipCode",
    ]);
    if (step == 2 && isValidate) {
      // setFormData({...formData, address: data})
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleNext3 = async () => {
    await trigger([
      "card.cardNumber",
      "card.cardHolder",
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
