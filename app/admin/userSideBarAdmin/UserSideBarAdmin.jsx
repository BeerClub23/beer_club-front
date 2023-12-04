"use client";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CloseIcon from "@mui/icons-material/Close";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { usePathname } from "next/navigation";
import "./UserSideBarAdmin.scss";
import Link from "next/link";
import { GenerateInvoices } from "../../services/payments";
import Swal from "sweetalert2";

const UserSideBarAdmin = (props) => {
  const [mobile, setMobile] = useState(false);
  const [width, setWidth] = useState();
  const [show, setSHow] = useState(false);

  const handleResize = () => setWidth();

  const generateInvoices = async () => {
    await GenerateInvoices()
      .then(() => {
        Swal.fire({
          title: "Facturación realizada con exito!",
          text: "Los miembros del club han recibido su factura!",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          // onClick: handleClick(),
          focusConfirm: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error,
          imageAlt: "No se pudo generar la facturación. Intenta Nuevamente!",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          icon: "error",
          focusConfirm: false,
        });
      });
  };

  useEffect(() => {
    document.addEventListener("resize", handleResize);
    width < 480 ? setMobile(true) : setMobile(false);
    const container = document.getElementById("cont");
    if (width < 480 && !show) {
      container.style.gridTemplateColumns = "auto";
    } else {
      container.style.gridTemplateColumns = "1fr 4fr";
    }
    if (width) return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const pathname = usePathname();
  return (
    <>
      <Box
        sx={{ backgroundColor: "white", boxShadow: "2px 0px 1px #8D8D8D" }}
        className={mobile && "mobile_version-container"}
        id={mobile & !show ? "mobile_version-container_showed" : ""}
      >
        {mobile && (
          <Box id="menu_drawer">
            {show ? (
              <CloseIcon
                onClick={() => {
                  setSHow(false);
                }}
              />
            ) : (
              <KeyboardArrowRightIcon
                onClick={() => {
                  setSHow(true);
                }}
              />
            )}
          </Box>
        )}
        <nav
          aria-label="main mailbox folders"
          id="nav_user"
          className={mobile && "mobile_version"}
          style={mobile & !show ? { display: "none" } : {}}
        >
          <List>
            <Link href="/admin/datos-personales">
              <ListItem
                className={
                  pathname.includes("/admin/datos-personales")
                    ? "active_nav_user"
                    : ""
                }
                sx={{ p: 0 }}
              >
                <ListItemButton sx={{ py: 2 }}>
                  <ListItemIcon>
                    <EditNoteIcon sx={{ color: "black !important" }} />
                  </ListItemIcon>
                  <ListItemText primary="Datos Personales" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/admin/subscripciones">
              <ListItem
                className={
                  pathname.includes("/admin/subscripciones")
                    ? "active_nav_user"
                    : ""
                }
                sx={{ p: 0 }}
              >
                <ListItemButton sx={{ py: 2 }}>
                  <ListItemIcon>
                    <TurnedInNotIcon sx={{ color: "black !important" }} />
                  </ListItemIcon>
                  <ListItemText primary="Subscripciones" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/admin/recomendaciones">
              <ListItem
                className={
                  pathname.includes("/admin/recomendaciones")
                    ? "active_nav_user"
                    : ""
                }
                sx={{ p: 0 }}
              >
                <ListItemButton sx={{ py: 2 }}>
                  <ListItemIcon>
                    <StarBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recomendaciones" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/admin/estadistica">
              <ListItem
                className={
                  pathname.includes("/admin/estadistica")
                    ? "active_nav_user"
                    : ""
                }
                sx={{ p: 0 }}
              >
                <ListItemButton sx={{ py: 2 }}>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Estadisticas" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/admin/adminusuarios">
              <ListItem
                className={
                  pathname.includes("/admin/adminusuarios")
                    ? "active_nav_user"
                    : ""
                }
                sx={{ p: 0 }}
              >
                <ListItemButton sx={{ py: 2 }}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Usuarios" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Button
            sx={{
              width: "80%",
              pt: "7px",
              mx: "auto",
              my: "50px",
              fontWeight: "bold",
              borderRadius: "5px",
              padding: "5px 40px",
              backgroundColor: "#f5e1c1",
              color: "black",
            }}
            onClick={generateInvoices}
          >
            Generar Facturación
          </Button>
        </nav>
      </Box>
    </>
  );
};

export default UserSideBarAdmin;
