import React from "react";
import "./SubscriptionCard.scss";
import { Button } from "@mui/material";
import { theme } from "@/app/styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";

const SubscriptionCard = ({
  title,
  benefits,
  price,
  isRecommended,
  action,
}) => {
  return (
    <article className="bc-subscription-card-container">
      <div
        className={`bc-subscription-card__recommended ${
          isRecommended ? "active" : ""
        }`}
      >
        {isRecommended ? "Recomendación del mes" : ""}
      </div>

      <div className="bc-subscription-card">
        <div className="bc-subscription-card__header">
          <h4 className="bc-subscription-card__title">{title}</h4>
          <span className="bc-subscription-card__price">$ {price}</span>
          <span>*Envío Gratis</span>
        </div>
        <hr />
        <ul>
          {benefits.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
        <div className="bc-subscription-card__action">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="large"
              onClick={action}
              fullWidth
              sx={{ pt: "7px", mx: "auto", mt: 5, mb: 4, fontWeight: "bold" }}
            >
              Comprar
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </article>
  );
};

export default SubscriptionCard;
