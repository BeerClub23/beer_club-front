import useSWR from 'swr';

const get = url => fetch(url).then(r => r.json());

const subscriptions = [
    {
        'title': 'Novato',
        'description': '',
        'price': '$ 100',
        'benefits': ['Descuentos en cervezas y locales asociados 5%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para novatos (Six pack, snacks, aperitivos)']
    },
    {
        'title': 'Especialista',
        'description': '',
        'price': '$ 200',
        'benefits': ['Descuentos en cervezas y locales asociados 8%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para especialistas (Six pack, snacks, aperitivos)']
    },
    {
        'title': 'Experto',
        'description': '',
        'price': '$ 300',
        'benefits': ['Descuentos en cervezas y locales asociados 10%', 'Descuentos en Eventos de Miembros', 'Recomendación Mensual para expertos (Six pack, snacks, aperitivos)']
    }
]

export const useGetSubscriptions = () => {
    const { data, error, isLoading } = useSWR(`/api/v1/subscriptions`, get, { fallbackData: subscriptions, shouldRetryOnError: false, errorRetryCount: 1 });

    return {
        subscriptions: data,
        isLoading,
        isError: error
    }
}