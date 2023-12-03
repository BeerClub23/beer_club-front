import React, { useEffect, useState } from "react";
import { Badge, Box, Fade, Typography, styled } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./UserBasicData.scss";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5e1c1',
    color: 'black',
    boxShadow: '0px 0px 4px black',
    textAlign: 'center',
    fontSize: 16,
  },
}));

const UserData = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  return (
    <Box className="userdata_box">
      <Box id="userdata_box-basicData">
        <Typography variant="h4">
          <b>{`Hola, ${currentUser.firstName} ${currentUser.lastName}`}</b>
        </Typography>
        <ul>
          <li>
            <>
              <PersonIcon />
              <Typography variant="p">
                Miembro desde: {currentUser.subscriptionDate}
              </Typography>
            </>
          </li>
          <li>
            <>
              <LocationOnIcon />
              <Typography variant="p" sx={{ textTransform: "uppercase" }}>
                {`${currentUser.address.city}, ${currentUser.address.province}, ${currentUser.address.country}`}
              </Typography>
            </>
          </li>
        </ul>
      </Box>
      <Box className="userData_box-membership" sx={{ textAlign: "center" }}>
        {
          !currentUser.nextSubscription?.id ? 
            <Typography variant="p">
              <b>{currentUser.subscription.name}</b>
            </Typography> :
            <LightTooltip 
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }} 
            placement="left"
            title={`Tu nueva subscripción "${currentUser.nextSubscription.name}" se verá reflejada en el siguiente periodo de facturación.`}>
              <Badge badgeContent={'!'} color="success" >
                <Typography variant="p" sx={{padding: '10px 5px'}}>
                  <b>{currentUser.subscription.name}</b>
                </Typography>
              </Badge>
            </LightTooltip>
          }
        
      </Box>
    </Box>
  );
};

export default UserData;
