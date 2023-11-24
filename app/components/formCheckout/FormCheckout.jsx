/* eslint-disable prettier/prettier */
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PersonalData from "./PersonalData";
import AddressData from "./AddressData";
import PaymentData from "./PaymentData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { theme } from "../../styles/materialThemeFormCheckout";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ApiRegister from "../../services/register";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

export const FormCheckout = ({ category }) => {
  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = useFormContext();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setFormData({ category: category.id });
    }
  }, [category]);

  if (isSubmitting) {
    Swal.fire({
      title: "Procesando el pago",
      html: "Por favor, espere...",
      allowOutsideClick: false,
      showConfirmButton: false,
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
      setFormData({
        ...formData,
        card: {
          cardNumber: data.card.cardNumber,
          expDate: data.card.expDate,
          cardHolder: data.card.cardHolder,
          cvv: data.card.cvc,
        },
      });
      const normalizedData = {
        subscriptionId: category.id,
        ...data.customer,
        ...data.address,
        cardNumber: data.card.cardNumber,
        expDate: data.card.expDate,
        cardHolder: data.card.cardHolder,
        cvv: data.card.cvc,
      };

      let response = await ApiRegister(normalizedData);
      if (response.status === 201) {
        Swal.fire({
          title: "Pago Aceptado!",
          html: `Factura: ${response.data.invoiceNumber}  <br/> Tarjeta: ...${response.data.cardNumber} <br/> Subscripción: ${response.data.description} <br/> Descripción: ${response.data.subscription.description} <br/> Importe: ${response.data.amount}`,
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          // onClick: handleClick(),
          focusConfirm: false,
        }).then(function () {
          router.push("/login");
        });
      } else if (response.status !== 200) {
        const error = Object.keys(response.response.data).reduce(
          (acc, key) => `${acc}${response.response.data[key]}\n`,
          "",
        );
        Swal.fire({
          title: "Error!",
          text: error,
          imageUrl: "../../images/icons/no-beer.jpg",
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "No puede ingresar",
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
            sx={{ mx: "auto", my: 4, maxWidth: "600px" }}
            activeStep={step - 1}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ fontWeight: "bold" }}>{label}</StepLabel>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              {step == 1 && <PersonalData />}
              {step == 2 && <AddressData />}
              {step == 3 && <PaymentData />}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={step === 1}
                  sx={{ margin: 2 }}
                  onClick={handleBack}
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
