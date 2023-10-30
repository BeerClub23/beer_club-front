import useSWR from "swr";

const get = url => fetch(url).then(r => r.json());

export const aboutSteps = [
    {   
        'icon': 'LoyaltyIcon',
        'title': 'Paso 1',
        'subtitle':  'Selección de la Cerveza',
        'description': ' Prepárate para explorar nuevos sabores y estilos... Cada mes, recibirás una emocionante caja con 6 cervezas artesanales cuidadosamente seleccionadas.',
    },
    {   
        'icon': 'CardMembershipIcon',
        'title': 'Paso 2',
        'subtitle':  'Suscripción',
        'description': 'Eligí la membresía que mejor se adapte a tu nivel cervecero. Completá tu suscripción en pocos minutos. Ingresá tus datos de contacto, junto con los detalles de pago.',
    },
    {
        'icon': 'CardGiftcardIcon',
        'title': 'Paso 3',
        'subtitle':  'Caja de Degustación',
        'description': 'Relajate y esperá... La caja será entregada directamente en tu domicilio.',
    }, 
    {
        'icon':'SportsBarIcon',
        'title': 'Último Paso',
        'subtitle':  'Beneficios',
        'description': 'Disfruta de los beneficios de ser miembro del Beer Club. Obtené descuentos exclusivos, acceso a eventos de degustación y unite a una comunidad apasionada por la cerveza.',
    }
]

/*export const useGetAboutSteps = () => {
    const { data, error, isLoading } = useSWR(`/api/v1/aboutSteps`, get, { fallbackData: aboutSteps, shouldRetryOnError: false, errorRetryCount: 1 });

    return {
        data,
        isLoading,
        isError: error
    }
}*/