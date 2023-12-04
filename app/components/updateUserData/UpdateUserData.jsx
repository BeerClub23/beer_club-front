import React, { useState } from "react";
import "./UpdateUserData.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  FormLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Modal from "../../common/Modal/Modal";
import { theme } from "@/app/styles/materialThemeForm";

const UpdateUserData = ({ user, updateData }) => {
  const [userUpdated, setUserUpdated] = useState(user);
  const [formUpdateUser, setFormUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formUpdateUserAddress, setFormUpdateUserAddress] = useState({
    city: "",
    street: "",
    number: "",
    floor: "",
    apartment: "",
    zipCode: "",
  });

  const handleUpdateFormBasicData = (e) => {
    setFormUpdateUser({
      ...formUpdateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormAddress = (e) => {
    setFormUpdateUserAddress({
      ...formUpdateUserAddress,
      [e.target.name]: e.target.value,
    });
  };

  const [showModal, setShowModal] = useState(false);
  const onSubmit = () => {
    for (let key in formUpdateUser) {
      if (formUpdateUser[key] === "") {
        formUpdateUser[key] = user[key];
      }
      userUpdated[key] = formUpdateUser[key];
    }
    for (let key in formUpdateUserAddress) {
      if (formUpdateUserAddress[key] === "") {
        formUpdateUserAddress[key] = user.address[key];
      }
      userUpdated.address[key] = formUpdateUserAddress[key];
    }
    setUserUpdated(userUpdated);
    updateData(userUpdated);
  };

  return (
    <>
      <Box className="updater_form">
        <FormControl sx={{ width: "100%" }} id="updater_form-container">
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h4">
              <b>Datos pesonales</b>
            </Typography>
            <Box className="updater_form-basicdata">
              <Box className="input_box">
                <FormLabel>Nombre</FormLabel>
                <TextField
                  placeholder={user.firstName}
                  name="firstName"
                  onChange={handleUpdateFormBasicData}
                  value={formUpdateUser.firstName}
                ></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Apellido</FormLabel>
                <TextField
                  value={formUpdateUser.lastName}
                  name="lastName"
                  onChange={handleUpdateFormBasicData}
                  placeholder={user.lastName}
                ></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Email</FormLabel>
                <TextField
                  value={formUpdateUser.email}
                  name="email"
                  onChange={handleUpdateFormBasicData}
                  placeholder={user.email}
                ></TextField>
              </Box>
            </Box>
          </Box>
          {user.role === "USER" && (
            <Box sx={{ width: "100%" }}>
              <Typography variant="h4">
                <b> Datos de envio</b>
              </Typography>
              <Box className="updater_form-address">
                <Box className="input_box">
                  <FormLabel>Direccion</FormLabel>
                  <TextField
                    name="street"
                    value={formUpdateUserAddress.street}
                    onChange={handleUpdateFormAddress}
                    placeholder={user.address.street}
                  ></TextField>
                </Box>
                <Box className="input_box">
                  <FormLabel>Numero</FormLabel>
                  <TextField
                    name="number"
                    onChange={handleUpdateFormAddress}
                    placeholder={user.address.number}
                    value={formUpdateUserAddress.number}
                    type="number"
                  ></TextField>
                </Box>
                <Box className="input_box">
                  <FormLabel>Ciudad</FormLabel>
                  <TextField
                    name="city"
                    onChange={handleUpdateFormAddress}
                    value={formUpdateUserAddress.city}
                    placeholder={user.address.city}
                  ></TextField>
                </Box>
                <Box className="input_box">
                  <FormLabel>Zip Code</FormLabel>
                  <TextField
                    name="zipCode"
                    value={formUpdateUserAddress.zipCode}
                    onChange={handleUpdateFormAddress}
                    placeholder={user.address.zipCode}
                  ></TextField>
                </Box>
                <Box className="input_box">
                  <FormLabel>Interior</FormLabel>
                  <TextField
                    name="apartment"
                    onChange={handleUpdateFormAddress}
                    value={formUpdateUserAddress.apartment}
                    placeholder={user.address.apartment}
                  ></TextField>
                </Box>
                <Box className="input_box">
                  <FormLabel>Numero Piso</FormLabel>
                  <TextField
                    name="floor"
                    onChange={handleUpdateFormAddress}
                    value={formUpdateUserAddress.floor}
                    placeholder={user.address.floor}
                    type="number"
                  ></TextField>
                </Box>
              </Box>
            </Box>
          )}
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="large"
              sx={{ pt: "7px", ms: "auto", mt: 3, mb: 4, fontWeight: "bold" }}
              onClick={onSubmit}
            >
              Guardar
            </Button>
          </ThemeProvider>
          {/* <Button className="updater_form-button" onClick={onSubmit}>
            Guardar
          </Button> */}
        </FormControl>
      </Box>
      {showModal && (
        <Modal>
          <div>Modal</div>
          <button onClick={() => setShowModal(false)}>OK</button>
        </Modal>
      )}
    </>
  );
};

export default UpdateUserData;
