import React from 'react';
import './SubscriptionSection.scss';
import SubscriptionCard from '../../components/subscriptionCard/SubscriptionCard'

const SubscriptionsSection = ({subscriptions}) => {

    return (
        <>
            <h2 className='bc-subscription-section__title'>Elige según tu nivel de experticia</h2>
            <section className='bc-subscription-section'>

                <SubscriptionCard  title={'Novato'} price={'$ 100'} products={['Descuentos en cervezas y locales asociados 5%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para novatos (Six pack, snacks, aperitivos)']}></SubscriptionCard>
                <SubscriptionCard  title={'Especialista'} price={'$ 200'} products={['Descuentos en cervezas y locales asociados 8%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para expecialistas (Six pack, snacks, aperitivos)']}></SubscriptionCard>
                <SubscriptionCard  title={'Experto'} price={'$ 300'} products={['Descuentos en cervezas y locales asociados 10%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para expertos (Six pack, snacks, aperitivos)']}></SubscriptionCard>

            </section>
        </>
        
    )
} 

export default SubscriptionsSection;
 
 