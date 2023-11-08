import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { theme } from "../../styles/materialThemeFormCheckout";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Image from "next/image";
import chop from "../../../public/images/aboutUs/lupulo.png";
import "./PlanCardForm.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const PlanCardForm = ({ category }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        className="cardContainer"
        sx={{ minWidth: 200, maxWidth: "500px", margin: "0 auto" }}
      >
        <CardContent>
          <Link href={"/planes"}>
            <ArrowBackIcon />
          </Link>
        </CardContent>
        <CardContent className="cardContainer_text">
          <Typography
            sx={{ fontSize: 16, fontWeight: "600" }}
            color="text.primary"
            gutterBottom
          >
            Tu Plan: {category?.title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography
            sx={{ mb: 1.5, fontSize: "1rem", fontWeight: "500" }}
            color="text.secondary"
          >
            Valor mensual: {category?.price}.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            *Envio gratis
          </Typography>
        </CardContent>
        <CardContent>
          <Image
            src={chop}
            width={50}
            height={71}
            alt="logo"
            priority
            className="cardContainer_picMobile"
          />
        </CardContent>
        {/* <CardActions>
        <Button sx={{ margin:'0 auto'}} size="small">Detalles</Button>
      </CardActions>  */}
      </Card>
    </ThemeProvider>
  );
};

export default PlanCardForm;
