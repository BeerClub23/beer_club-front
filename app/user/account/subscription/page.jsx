"use client";

import { Box, Button, Typography } from "@mui/material";
import subscriptionImage from "../../../../public/images/user/subscription.png";
import "./Subscriptions.scss";
import { useUserBeerContext } from "@/app/context/user";
import StarIcon from "@mui/icons-material/Star";

const AccountPage = () => {

  const { user } = useUserBeerContext();

  const subscriptionsData = [
    {
      title: "Novato",
      description:
        "Disfrutas de la cerveza y quieres conocer más acerca de ella, con esta membresía disfrutarás de:",
      beneficios: [
        "Descuentos en cervezas y locales asociados 5%",
        "Descuentos en Eventos de Miembros",
        "Recomendación Novato Mensual (Six pack, snacks, aperitivos)",
        "Envío gratis.",
      ],
    },
    {
      title: "Especialista",
      description:
        "Sabes reconocer algunas cerveza y quieres perfeccionar tú conocimiento, con esta membresía disfrutarás de:",
      beneficios: [
        "Descuentos en cervezas y locales asociados 8%",
        "Descuentos en Eventos de Miembros",
        "Recomendación Especialista Mensual (Six pack, snacks, aperitivos)",
        "Envío gratis.",
      ],
    },
    {
      title: "Experto",
      description:
        "Prueba nuevas cervezas y comparte tu conocimiento con todos los miembros del club, con esta membresía optendrás:",
      beneficios: [
        "Descuentos en cervezas y locales asociados 10%",
        "Descuentos en Eventos de Miembros",
        "Recomendación Experto Mensual (Six pack, snacks, aperitivos)",
        "Envío gratis.",
      ],
    },
  ];
  return (
    <Box className="subscriptionContainer">
      {subscriptionsData.map((subscription, idx) => {
        return (
          <Box
            key={idx}
            className="cardContainer"
            id={subscription.title}
            style={{
              backgroundImage: `url(${subscriptionImage.src})`,
              width: "400px",
              height: "460px",
            }}
            sx={
              subscription.title === user.subscription.name && {
                border: "2px solid black",
              }
            }
          >
            {subscription.title === user.subscription.name && (
              <StarIcon sx={{ color: "goldenrod" }} />
            )}
            <Typography
              className="cardContainer-title"
              sx={{ fontSize: "28px" }}
            >
              {subscription.title}
            </Typography>
            <Typography className="cardContainer-description">
              {subscription.description}
            </Typography>
            <Box className="cardContainer-beneficios">
              <ul>
                {subscription.beneficios.map((beneficio, idx) => {
                  return (
                    <li key={idx}>
                      <Typography>{beneficio}</Typography>
                    </li>
                  );
                })}
              </ul>
              <Button disabled={subscription.title === user.subscription.name}>
                {subscription.title === user.subscription.name
                  ? "Suscrito"
                  : "Suscribirme"}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AccountPage;
