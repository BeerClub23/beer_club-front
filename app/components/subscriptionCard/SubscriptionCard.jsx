import React from "react";
import "./SubscriptionCard.scss";

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
          <span className="bc-subscription-card__price">{price}</span>
          <span>*Envío Gratis</span>
        </div>
        <hr />
        <ul>
          {benefits.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
        <button className="bc-subscription-card__action" onClick={action}>
          Comprar
        </button>
      </div>
    </article>
  );
};

export default SubscriptionCard;
