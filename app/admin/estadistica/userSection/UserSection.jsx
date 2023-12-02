import React from "react";
import UserFilterPanelContent from "../../../components/UserFilterPanelContent/UserFilterPanelContent";
import { Box, Typography } from "@mui/material";
import { useGetReportingUsers } from "@/app/services/reportsData";
import "./UserSection.scss";


const UserSection = () => {
  const { usersData } = useGetReportingUsers();
 

  return (
    <Box className="userSectionContainer">
      <Typography sx={{ color: "#000" }} className="userSectionTitle">
        Detalle de Usuarios
      </Typography>
      {usersData.length > 0 && (
        <UserFilterPanelContent users={usersData}></UserFilterPanelContent>
      )}
    </Box>
  );
};

export default UserSection;
