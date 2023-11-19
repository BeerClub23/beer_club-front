"use client";
import { React } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
const DropDown = ({ profile, logOut, open = false, handleClose, anchorEl }) => {
  const router = useRouter();

  const handleLink = () => {
    handleClose();
    router.push(`${profile}`);
  };
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      disableScrollLock={true}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <MenuItem onClick={handleLink}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Mi cuenta
      </MenuItem>
      <MenuItem onClick={logOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default DropDown;
