import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./UserBasicData.scss";

const UserData = ({ user }) => {
  return (
    <Box className="userdata_box">
      <Box id="userdata_box-basicData">
        <Typography variant="h4">
          <b>{`Hola, ${user.firstName} ${user.lastName}`}</b>
        </Typography>
        <ul>
          <li>
            <>
              <PersonIcon />
              <Typography variant="p">
                Miembro desde: {user.subscriptionDate}
              </Typography>
            </>
          </li>
          <li>
            <>
              <LocationOnIcon />
              <Typography variant="p" sx={{ textTransform: "uppercase" }}>
                {`${user.address.city}, ${user.address.province}, ${user.address.country}`}
              </Typography>
            </>
          </li>
        </ul>
      </Box>
      <Box className="userData_box-membership" sx={{ textAlign: "center" }}>
        <Typography variant="p">
          <b>{user.subscription.name}</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserData;
