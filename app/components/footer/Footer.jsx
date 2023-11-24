"use client";
import "./footer.scss";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";
import Logo from "../../../public/images/logo/Logo_sin_escudo_Negro.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    if (screen.width < 768) {
      setWhatsapp(`wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?`);
    } else {
      setWhatsapp(
        `web.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&`,
      );
    }
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#EEE9E1",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        color: "#000000",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent={"center"}
          spacing={2}
        >
          <Grid item xs={12} sm={4} className="logoContainer">
            <Link href={"/home"}>
              <Image
                src={Logo}
                width={130}
                height={130}
                alt={"logo Beer Club"}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="linkContainer">
            <div>
              <Typography
                variant="body1"
                component="div"
                className="linkItem"
                sx={{ fontWeight: "bold", marginBottom: "2px" }}
              >
                <Link href="/faqs">Preguntas frecuentes</Link>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="linkItem"
                sx={{ fontWeight: "bold", marginBottom: "2px" }}
              >
                <Link href="/informacion-legal" target={"_blank"}>
                  Información legal
                </Link>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="linkItem"
                sx={{ fontWeight: "bold", marginBottom: "2px" }}
              >
                <Link
                  href={pathname === "/home" ? `#nosotros` : `/home/#nosotros`}
                >
                  Acerca de nosotros
                </Link>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="linkItem linkWapp"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "2px",
                  display: "flex",
                  gap: 1,
                }}
              >
                <Link
                  href={`https://${whatsapp}text=Hola,%20necesito%20hacerles%20una%20consulta...`}
                  target="_blank"
                >
                  Contáctanos
                </Link>
                <WhatsAppIcon />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={3} className="socialStack">
              <Link href="https://www.facebook.com">
                <FacebookIcon
                  className="socialIcon"
                  sx={{ fontSize: "30px" }}
                />
              </Link>
              <Link href="https://www.youtube.com">
                <YouTubeIcon className="socialIcon" sx={{ fontSize: "30px" }} />
              </Link>
              <Link href="https://www.twitter.com">
                <TwitterIcon className="socialIcon" sx={{ fontSize: "30px" }} />
              </Link>
              <Link href="https://www.instagram.com">
                <InstagramIcon
                  className="socialIcon"
                  sx={{ fontSize: "30px" }}
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
