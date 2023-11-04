"use client";

import * as React from "react";
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
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Logo from "public/images/logo/Logo_sin_escudo_Color_Original.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./headerPublic.scss";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const drawerWidth = 240;
const navItems = [
  { name: "Nosotros", route: "#nosotros" },
  { name: "Como funciona", route: "#como-funciona" },
  { name: "Subscribite", route: "#suscribirse" },
  { name: "Login", route: "/login" },
];

export default function HeaderGeneral(props) {
  const pathname = usePathname();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Beer Club
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                href={
                  pathname === "/home" ? `${item.route}` : `/home${item.route}`
                }
              >
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <header>
      <Slide appear={false} direction="down" in={!trigger}>
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
              <Link href={"/home"} className={"nav_logo"}>
                <Image src={Logo} width={90} height={90} alt="Beer Club Logo" />
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
                {navItems.map((item) => (
                  // <Link href={item.route} key={item.name} sx={{ color: '#fff'}} className='navItem'>{item.name}</Link>
                  <Link
                    href={
                      pathname === "/home"
                        ? `${item.route}`
                        : `/home${item.route}`
                    }
                    key={item.name}
                    sx={{ color: "#fff" }}
                    className={"nav_navItem"}
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {item.name}{" "}
                  </Link>
                ))}
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
