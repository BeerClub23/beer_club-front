'use client'
import React from 'react';
import './SubscriptionSection.scss';
import SubscriptionCard from '../../components/subscriptionCard/SubscriptionCard'
import { useAppContext } from '../../context/context';
import { useRouter } from 'next/navigation';
import { useGetSubscriptions } from '../../services/subscriptions';
import { Container } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const SubscriptionsSection = () => {
    const { context, setContext} = useAppContext();
    const { subscriptions, isLoading, isError} = useGetSubscriptions();
    const router = useRouter();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      centerMode: false,
      centerPadding: "0px",
      responsive: [    
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:2,
            settings: { centerMode: false, slidesToShow: 1, slidesToScroll: 1, initialSlide:2}
          }
        },
        // {
        //   breakpoint: 900,
        //   settings: {
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        //   }
        // }
      ]
    };
    

    const goToRegister = (subscription) => {
        setContext( {...context, subscription});
        router.push('/register');
    }

    return (
        <div className='bc-subscription-section-container'>
            <Container >
                <h2 className='bc-subscription-section__title'>Elige según tu nivel de experticia</h2>
                <section className='bc-subscription-section' id='suscribirse'>
                    <Slider {...settings}>
                    {
                        subscriptions.map((subscription) => <SubscriptionCard key={subscription.title} action={() => goToRegister(subscription.title)} title={subscription.title} price={subscription.price} benefits={subscription.benefits} isRecommended={subscription.isRecommended}></SubscriptionCard>)
                    }
                    </Slider>
                </section>
            </Container>
        </div>
        
        
    )
} 

export default SubscriptionsSection;
 
 