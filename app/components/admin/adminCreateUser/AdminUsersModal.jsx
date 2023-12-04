import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box, IconButton, TextField } from "@mui/material";
// import { theme } from "../../../styles/materialThemeForm";
import { theme } from "../../../styles/materialThemeFormCheckout";
import { ThemeProvider } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { AdminUsersSchema } from "../adminCreateUser/rules/index";
import * as yup from "yup";

const AdminUsersModal = ({ open, onClose, onSave, rowData }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
      setValidationErrors({});
    } else {
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
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

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Clear previous validation errors
      setValidationErrors({});

      const isEdit = !!rowData;

      await AdminUsersSchema.validate(formData, {
        abortEarly: false,
        context: { isEdit },
      });
      // Validate if the user open the modal from the edit or the create btn
      const newFormData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      console.log(newFormData);
      onSave(newFormData, isEdit ? (rowData && rowData.id) || null : null);
      onClose();
    } catch (error) {
      console.log(error);
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
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSave}>
          <DialogTitle className={"modal-title"}>
            {rowData ? "Editar usuario admin" : "Añadir usuario admin"}
          </DialogTitle>
          <DialogContent
            className={"modal-container"}
            sx={{ flexDirection: "column" }}
          >
            {rowData ? (
              <TextField
                disabled
                name="id"
                variant="outlined"
                label={"Id"}
                defaultValue={rowData.id}
                className="input-modal"
                sx={{ mb: 2 }}
              />
            ) : (
              ""
            )}

            <TextField
              type="text"
              name="name"
              label="Nombre"
              variant="outlined"
              value={formData.name}
              onChange={handleFieldChange}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              className="input-modal"
              sx={{ mb: 2 }}
            />

            <TextField
              type="text"
              name="lastName"
              label="Apellido"
              variant="outlined"
              value={formData.lastName}
              onChange={handleFieldChange}
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
              className="input-modal"
              sx={{ mb: 2 }}
            />

            <TextField
              type="text"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleFieldChange}
              className="input-modal"
              sx={{ mb: 2 }}
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={handleFieldChange}
              className="input-modal"
              sx={{ mb: 2 }}
            />

            <TextField
              type="password"
              name="passwordConfirm"
              label="Confirm Password"
              variant="outlined"
              value={formData.passwordConfirm}
              onChange={handleFieldChange}
              className="input-modal"
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <Box className={"btn-container"}>
            <Button
              className={"cancel-btn"}
              variant="outline"
              sx={{
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
      </ThemeProvider>
    </Dialog>
  );
};

export default AdminUsersModal;
