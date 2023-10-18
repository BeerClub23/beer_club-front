import React from 'react';
import './SubscriptionCard.scss';

const SubscriptionCard = ({title, products, price, isRecommended, action}) => {
    return (
      <article className='bc-subscription-card'>
        <div className='bc-subscription-card__header'>
            <h4 className='bc-subscription-card__title'>{title}</h4>
            <span className='bc-subscription-card__price'>{price}</span>
            <span>*Envío Gratis</span>
        </div>
        <hr/>
        <ul>
            {
                products.map((product, index) => <li key={index}>{product}</li>)
            }
        </ul>
        <button className='bc-subscription-card__action' onClick={action} >Comprar</button>
      </article>    
    )
  }
  
  export default SubscriptionCard;
