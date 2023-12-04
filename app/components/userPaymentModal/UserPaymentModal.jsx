import { useForm, FormProvider } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import PaymentData from "../formCheckout/PaymentData";
import { theme } from "../../styles/materialThemeFormCheckout";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./rules/index";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { UpdatePayment } from "../../services/payment";
import "./userPaymentModal.scss";

const UserPaymentModal = ({ open, onClose, payment }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { handleSubmit, trigger, formState, reset } = methods;
  const { isSubmitting } = formState;

  const handleDialogClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Procesando el pago",
      html: "Por favor, espere...",
      allowOutsideClick: false,
      showConfirmButton: false,
      customClass: {
        container: "sweet-alert-container",
      },
    });

    try {
      const newData = {
        ...data.card,
        cvv: data.card.cvc,
        paymentId: payment,
      };
      delete newData.cvc;

      let isCardValid = await trigger([
        "card.cardNumber",
        "card.cvv",
        "card.expDate",
        "card.cardHolder",
      ]);

      if (isCardValid) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let response = await UpdatePayment(newData);
        if (response.status === 200) {
          Swal.fire({
            title: "Pago Aceptado!",
            html: `Factura: ${response.data.invoiceNumber}  <br/> Descripción: ${response.data.description} <br/> Importe: ${response.data.amount}`,
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#ceb5a7",
            focusConfirm: false,
            customClass: {
              container: "sweet-alert-container",
            },
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              reset();
              onClose();
            }
          });
        } else if (response.status !== 200) {
          const error = Object.keys(response.response.data).reduce(
            (acc, key) => `${acc}${response.response.data[key]}\n`,
            "",
          );
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#ceb5a7",
            focusConfirm: false,
            customClass: {
              container: "sweet-alert-container",
            },
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              reset();
              onClose();
            }
          });
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      className="modal-form-container"
      open={open}
      onClose={handleDialogClose}
    >
      <DialogContent className={"modal-container"}>
        <ThemeProvider theme={theme}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <PaymentData />
              <Box textAlign={"center"}>
                <Button
                  variant="outlined"
                  sx={{
                    margin: 2,
                    color: "darkgray",
                    borderColor: "lightgray",
                  }}
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ margin: 2 }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </FormProvider>
        </ThemeProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UserPaymentModal;
