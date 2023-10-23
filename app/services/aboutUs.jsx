import useSWR from "swr";

const get = url => fetch(url).then(r => r.json());

const aboutUs = {
    'description': 'En Beer Club, somos una comunidad apasionada por la cerveza que comparten un profundo aprecio por la artesanía y la diversidad de ésta bebida milenaria. Nuestra historia se origina en la búsqueda de un grupo de entusiastas de la cerveza que deseaban llevar la experiencia cervecera a un nivel superior. Así nació Beer Club.',
    'property':['Compromiso con la Excelencia','Experiencia Mensual Personalizada', 'Fomentamos la Comunidad Cervecera','Descubrimiento y Educación']
}

export const useGetAboutSteps = () => {
    const { data, error, isLoading } = useSWR(`/api/v1/aboutSteps`, get, { fallbackData: aboutUs, shouldRetryOnError: false, errorRetryCount: 1 });

    return {
        data,
        isLoading,
        isError: error
    }
}