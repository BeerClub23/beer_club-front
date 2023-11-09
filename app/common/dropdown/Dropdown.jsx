import { React } from "react";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Link } from "@mui/material";

const DropDown = () => {
  const handleLogout = () => {
  };

  return (
    <>
      <List className="dropDown__menu">
        <ListItem id="option">
          {/* <Typography variant="span" class="material-icons">
            account_circle
          </Typography> */}
          <ListItemText primary="My Profile" />
        </ListItem>
        <Box className="Line"></Box>
        <ListItem id="option" className="logout" onClick={handleLogout}>
          {/* <Typography variant="span" class="material-icons">
            logout
          </Typography> */}
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default DropDown;
