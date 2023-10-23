import "./footer.scss";
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
        bottom: "0",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent={"center"}
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
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
              <Typography variant="body1" component="div" className="linkItem" sx={{fontWeight:"bold",marginBottom:"2px"}}>
                <Link href="/faqs">Preguntas frecuentes</Link>
              </Typography>
              <Typography variant="body1" component="div" className="linkItem" sx={{fontWeight:"bold",marginBottom:"2px"}}>
                <Link href="/informacion-legal">Información legal</Link>
              </Typography>
              <Typography variant="body1" component="div" className="linkItem" sx={{fontWeight:"bold",marginBottom:"2px"}}>
                <Link href="/nosotros">Acerca de nosotros</Link>
              </Typography>
              <Typography variant="body1" component="div" className="linkItem" sx={{fontWeight:"bold",marginBottom:"2px"}}>
                <Link href={`https://wa.me/${process.env.PHONE_NUMBER}?text=Bienvenido+a+beer+club+%21%21%21`}>Contáctanos</Link>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={3} className="socialStack">
              <Link href="https://www.facebook.com">
                <FacebookIcon className="socialIcon" sx={{fontSize:"30px"}} />
              </Link>
              <Link href="https://www.youtube.com">
                <YouTubeIcon className="socialIcon" sx={{fontSize:"30px"}} />
              </Link>
              <Link href="https://www.twitter.com">
                <TwitterIcon className="socialIcon" sx={{fontSize:"30px"}}/>
              </Link>
              <Link href="https://www.instagram.com">
                <InstagramIcon className="socialIcon" sx={{fontSize:"30px"}}/>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}