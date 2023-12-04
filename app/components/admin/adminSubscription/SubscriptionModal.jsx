import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box, IconButton, TextField, Divider } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { subscriptionSchema } from "./rules/index";
import { theme } from "../../../styles/materialThemeAdmin";
import * as yup from "yup";

const SubscriptionModal = ({ open, onClose, onSave, rowData }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    isActive: false,
    isRecommended: false,
    description: "",
    benefits: [],
  });

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
      setValidationErrors({});
    } else {
      setFormData({
        id: "",
        name: "",
        price: 0,
        isActive: false,
        isRecommended: false,
        description: "",
        benefits: [],
      });
      setValidationErrors({});
    }
  }, [rowData, open]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setValidationErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, [name]: undefined };

      return updatedErrors;
    });

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBenefitsChange = (index, value) => {
    setFormData((prevData) => {
      const updatedBenefits = [...prevData.benefits];

      if (value === "") {
        updatedBenefits.splice(index, 1);
      } else {
        updatedBenefits[index] = { name: value };
      }

      return {
        ...prevData,
        benefits: updatedBenefits,
      };
    });
  };

  const handleAddBenefit = () => {
    setFormData((prevData) => ({
      ...prevData,
      benefits: [...prevData.benefits, { name: "" }],
    }));
  };

  const handleRemoveBenefit = (index) => {
    setFormData((prevData) => {
      const updatedBenefits = [...prevData.benefits];
      updatedBenefits.splice(index, 1);
      return {
        ...prevData,
        benefits: updatedBenefits,
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Clear previous validation errors
      setValidationErrors({});

      const isEdit = !!rowData;

      await subscriptionSchema
        .omit("benefits")
        .validate(formData, { abortEarly: false, context: { isEdit } });
      // Validate if the user open the modal from the edit or the create btn
      onSave(formData, isEdit ? (rowData && rowData.id) || null : null);
      onClose();
    } catch (error) {
      // Handle Yup validation errors
      if (error instanceof yup.ValidationError) {
        const errors = {};

        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });

        setValidationErrors(errors);
      }
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      className="modal-form-container"
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSave}>
        <DialogTitle sx={{ textAlign: "center" }}>
          {rowData ? "Editar suscripción" : "Añadir suscripción"}
        </DialogTitle>
        <DialogContent className={"modal-container"}>
          {rowData ? (
            <TextField
              disabled
              name="id"
              variant="outlined"
              label={"Id"}
              defaultValue={rowData.id}
              fullWidth
              sx={{ mt: 2 }}
              //className="input-modal"
            />
          ) : (
            ""
          )}
          <br />
          <TextField
            type="text"
            name="name"
            label="Nombre"
            variant="outlined"
            value={formData.name}
            onChange={handleFieldChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
            fullWidth
            sx={{ mt: 2 }}
            //className="input-modal"
          />
          <br />
          <TextField
            type="number"
            name="price"
            label="Precio"
            variant="outlined"
            value={formData.price}
            onChange={handleFieldChange}
            error={!!validationErrors.price}
            helperText={validationErrors.price}
            //className="input-modal"
            fullWidth
            sx={{ mt: 2 }}
          />
          <br />
          <TextField
            type="text"
            name="description"
            label="Descripción"
            variant="outlined"
            value={formData.description}
            onChange={handleFieldChange}
            multiline
            maxRows={4}
            //className="description-input"
            fullWidth
            sx={{ mt: 2 }}
          />
          <br />
          <Box>
            <Box mt={2}>
              <Divider>Beneficios</Divider>
            </Box>
            {formData.benefits.map((benefit, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  type="text"
                  name={`benefits[${index}].name`}
                  label="Beneficio"
                  variant="outlined"
                  value={benefit.name}
                  onChange={(e) => handleBenefitsChange(index, e.target.value)}
                  //className="input-modal"
                  fullWidth
                  sx={{ mt: 2 }}
                />

                <IconButton onClick={() => handleRemoveBenefit(index)}>
                  <DeleteOutline />
                </IconButton>
              </div>
            ))}
            <span style={{ color: "red", marginTop: "8px", display: "block" }}>
              {validationErrors.benefits && validationErrors.benefits[0]?.name}
            </span>
            <br />
            <Button
              onClick={handleAddBenefit}
              variant="outlined"
              sx={{
                ...theme.components.MuiButton.styleOverrides.addElementBtn,
              }}
              startIcon={<AddIcon />}
              style={{ marginLeft: "8px" }}
            >
              Añadir beneficio
            </Button>
          </Box>
        </DialogContent>
        <Box sx={{ display: "flex", width: "65%", margin: "auto" }}>
          <Button
            // className={"cancel-btn"}
            variant="text"
            sx={{
              ...theme.components.MuiButton.styleOverrides.cancelBtn,
              pt: "7px",
              mx: "auto",
              mt: 1,
              mb: 4,
              fontWeight: "bold",
            }}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              pt: "7px",
              mx: "auto",
              mt: 1,
              mb: 4,
              fontWeight: "bold",
            }}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default SubscriptionModal;
