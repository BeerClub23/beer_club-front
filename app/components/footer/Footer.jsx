import { Box, Stack, Container, Grid, Typography } from "@mui/material";
import Logo from "../../../public/images/logo/Logo_sin_escudo_Negro.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
        <Grid container spacing={2} alignItems="center" columnSpacing={{ sm: 1 }}>
          <Grid item xs={12} sm={4}>
            <Link href={"../../home"}>
              <Image src={Logo} width={150} height={150} alt={'logo Beer Club'}/>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}  >
            <Typography variant="body1" component="div" fontWeight="bold">
              <Link href="https://example.com">Preguntas frecuentes</Link>
            </Typography>
            <Typography variant="body1" component="div" fontWeight="bold">
              <Link href="https://example.com">Información legal</Link>
            </Typography>
            <Typography variant="body1" component="div" fontWeight="bold">
              <Link href="https://example.com">Acerca de nosotros</Link>
            </Typography>
            <Typography variant="body1" component="div" fontWeight="bold">
              <Link href="https://example.com">Contáctanos</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <FacebookIcon sx={{ fontSize: "30px" }} />
              <YouTubeIcon sx={{ fontSize: "30px" }} />
              <TwitterIcon sx={{ fontSize: "30px" }} />
              <InstagramIcon sx={{ fontSize: "30px" }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}