import React from "react";
import UserFilterPanelContent from "../../../components/UserFilterPanelContent/UserFilterPanelContent";
import { Box, Typography } from "@mui/material";
import { useGetReportingUsers } from "@/app/services/reportsData";
import "./UserSection.scss";

const UserSection = () => {
  const { usersData } = useGetReportingUsers();

  const usersRoleUser = usersData.filter((user) => user.role === "USER");

  return (
    <Box className="userSectionContainer">
      <Typography className="userSectionTitle">Detalle de Usuarios</Typography>
      {usersData.length > 0 && (
        <UserFilterPanelContent users={usersRoleUser}></UserFilterPanelContent>
      )}
    </Box>
  );
};

export default UserSection;
