'use client'
import React, {useContext} from 'react';
import './SubscriptionSection.scss';
import SubscriptionCard from '../../components/subscriptionCard/SubscriptionCard'
import { useAppContext } from '../../context/context';
import { useRouter } from 'next/navigation';
import { useGetSubscriptions } from '../../services/subscriptions';

const SubscriptionsSection = () => {
    const { context, setContext} = useAppContext();
    const { subscriptions, isLoading, isError} = useGetSubscriptions();
    const router = useRouter();

    const goToRegister = (subscription) => {
        setContext({subscription});
        router.push('/register');
    }

    return (
        <>
            <h2 className='bc-subscription-section__title'>Elige según tu nivel de experticia</h2>
            <section className='bc-subscription-section'>
                {
                    subscriptions.map((subscription) => <SubscriptionCard key={subscription.title} action={() => goToRegister(subscription.title)} title={subscription.title} price={subscription.price} benefits={subscription.benefits}></SubscriptionCard>)
                }
            </section>
        </>
        
    )
} 

export default SubscriptionsSection;
 
 