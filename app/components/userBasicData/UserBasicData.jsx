import React from "react";
import DataUser from "../../../public/MockDta";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./UserBasicData.scss";

const UserData = () => {
  return (
    <Box className="userdata_box">
      <Box id="userdata_box-basicData">
        <Typography variant="h4">
          <b>Hola, {DataUser.BasicData.fullname}</b>
        </Typography>
        <ul>
          <li>
            <>
              <PersonIcon />
              <Typography variant="p">
                Miembron desde {DataUser.BasicData.memberSince}
              </Typography>
            </>
          </li>
          <li>
            <>
              <LocationOnIcon />
              <Typography variant="p">
                {DataUser.BasicData.cityCountry}
              </Typography>
            </>
          </li>
        </ul>
      </Box>
      <Box className="userData_box-membership" sx={{ textAlign: "center" }}>
        <Typography variant="p">
          <b>{DataUser.BasicData.membershipType}</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserData;
