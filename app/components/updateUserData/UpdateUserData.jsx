import React, { useState } from "react";
import "./UpdateUserData.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import { putUserInfo } from "@/app/services/user";
import Modal from "../../common/Modal/Modal";
import { Router } from "next/navigation";

const UpdateUserData = ({ user }) => {
  const [form, setForm] = useState();
  const [showModal, setShowModal] = useState(false);
  const onSubmit = () => {
    // putUserInfo(form);
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
                <TextField placeholder={user.firstName}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Apellido</FormLabel>
                <TextField placeholder={user.lastName}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Email</FormLabel>
                <TextField placeholder={user.email}></TextField>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h4">
              <b> Datos de envio</b>
            </Typography>
            <Box className="updater_form-address">
              <Box className="input_box">
                <FormLabel>Direccion</FormLabel>
                <TextField placeholder={user.address.street}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Numero</FormLabel>
                <TextField placeholder={user.address.number}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Ciudad</FormLabel>
                <TextField placeholder={user.address.city}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Zip Code</FormLabel>
                <TextField placeholder={user.address.zipCode}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Interior</FormLabel>
                <TextField placeholder={user.address.apartment}></TextField>
              </Box>
              <Box className="input_box">
                <FormLabel>Numero Piso</FormLabel>
                <TextField placeholder={user.address.floor}></TextField>
              </Box>
            </Box>
          </Box>
          <Button className="updater_form-button" onClick={onSubmit}>
            Guardar
          </Button>
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
