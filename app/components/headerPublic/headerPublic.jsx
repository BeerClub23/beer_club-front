"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../../common/UserAvatar/UserAvatar";
import "./headerPublic.scss";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import DropDown from "../../common/dropdown/Dropdown";
import { useUserBeerContext } from "@/app/context/user";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export default function HeaderGeneral({ window, items }) {
  const [navItems, setNavItems] = useState([]);
  const pathname = usePathname();
  const { user, setUser } = useUserBeerContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentWindow, setWindow] = useState(window);
  const [urlLogo, seturlLogo] = useState("/home");
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const token = Cookies.get("jwt");

  const handleLogout = () => {
    Cookies.remove("jwt");
    setUser(null);
    router.push("/home");
  };

  useEffect(() => {
    setNavItems(items);
    setWindow(window);
  }, [items, window]);

  const trigger = useScrollTrigger({
    target: currentWindow ? currentWindow() : undefined,
  });
  const container =
    currentWindow !== undefined
      ? () => currentWindow().document.body
      : undefined;
      
  if (token) {
    const decodeToken = jwtDecode(token);
    if (decodeToken.role === "ROLE_ADMIN") {
      seturlLogo("/admin");
    }
    if (decodeToken.role === "ROLE_USER") {
      seturlLogo("/user");
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="mobileBox"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Beer Club
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              {user && item.name == "Me" ? (
                <>
                  {`${user.firstName} ${user.lastName}`}
                  <DropDown />
                </>
              ) : (
                <Link href={item.route}>{item.name}</Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header>
      <Slide
        id={pathname.includes("user") ? "user-header" : ""}
        appear={false}
        direction="down"
        in={!trigger}
      >
        <AppBar component="nav">
          <Container>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Link href={urlLogo} className={"nav_logo"}>
                <Image
                  src={Logo}
                  width={90}
                  height={90}
                  alt="Beer Club Logo"
                  priority
                />
              </Link>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {navItems.map((item) =>
                  // <Link href={item.route} key={item.name} sx={{ color: "#fff"}} className="navItem">{item.name}</Link>

                  user && item.name == "Me" ? (
                    <div key={item.name}>
                      <Box id="userHeader" onClick={handleClick}>
                        <UserAvatar
                          userName={`${user.firstName}
                          ${user.lastName}`}
                        />
                      </Box>
                      <DropDown
                        profile={item.route}
                        logOut={handleLogout}
                        open={open}
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                      />
                    </div>
                  ) : (
                    <Link
                      href={item.route}
                      key={item.name}
                      sx={{ color: "#fff" }}
                      className={"nav_navItem"}
                      style={{ scrollBehavior: "smooth" }}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </header>
  );
}
