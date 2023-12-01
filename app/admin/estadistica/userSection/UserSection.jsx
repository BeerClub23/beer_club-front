import React from "react";
import UserFilterPanelContent from "../../../components/UserFilterPanelContent/UserFilterPanelContent";
import { Box, Typography } from "@mui/material";
import { useGetReportingUsers } from "@/app/services/reportsData";

const UserSection = () => {
    const{usersData} = useGetReportingUsers()
    
  return (
    <Box>
      <Typography sx={{color:"#000"}}>Detalle de Usuarios</Typography>
      {usersData.length >0 && <UserFilterPanelContent users={usersData}></UserFilterPanelContent>}
    </Box>
  );
};

export default UserSection;
