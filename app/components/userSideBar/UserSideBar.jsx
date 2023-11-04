import { Box } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import StarRateIcon from "@mui/icons-material/StarRate";
import HistoryIcon from "@mui/icons-material/History";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const UserSideBar = () => {
  const navItems = [
    {
      name: "Administracion plan",
      route: "adminplan",
    },
    { name: "Datos personales", route: "datos-personales" },
    { name: "Recomendaciones", route: "recomendaciones" },
    { name: "Historial", route: "historial" },
    { name: "Estadisticas", route: "estadisticas" },
  ];

  return (
    <Box sx={{ backgroundColor: "white", boxShadow: "2px 0px 1px #8D8D8D" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {navItems.map((item, idx) => (
            <ListItem disablePadding key={idx}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default UserSideBar;
