'use client'
import React, {useContext} from 'react';
import './SubscriptionSection.scss';
import SubscriptionCard from '../../components/subscriptionCard/SubscriptionCard'
import { useAppContext } from '../../context/context';
import { useRouter } from 'next/navigation';

const SubscriptionsSection = ({subscriptions}) => {
    const {context, setContext} = useAppContext();
    const router = useRouter();

    const goToRegister = (subscription) => {
        setContext({subscription});
        router.push('/register');
    }

    return (
        <>
            <h2 className='bc-subscription-section__title'>Elige según tu nivel de experticia</h2>
            <section className='bc-subscription-section'>

                <SubscriptionCard action={() => goToRegister('Novato')} title={'Novato'} price={'$ 100'} products={['Descuentos en cervezas y locales asociados 5%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para novatos (Six pack, snacks, aperitivos)']}></SubscriptionCard>
                <SubscriptionCard action={() => goToRegister('Especialista')} title={'Especialista'} price={'$ 200'} products={['Descuentos en cervezas y locales asociados 8%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para expecialistas (Six pack, snacks, aperitivos)']}></SubscriptionCard>
                <SubscriptionCard action={() => goToRegister('Experto')} title={'Experto'} price={'$ 300'} products={['Descuentos en cervezas y locales asociados 10%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para expertos (Six pack, snacks, aperitivos)']}></SubscriptionCard>

            </section>
        </>
        
    )
} 

export default SubscriptionsSection;
 
 