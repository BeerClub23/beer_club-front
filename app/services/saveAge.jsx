import useSWR from "swr";

const post = (url, body) => fetch(url, {
    method: 'POST',
    body
}).then((r) => r.json());

export const useSaveAgeInfo = (ageInfo) => {
    const { data, error, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}ageVerification`, ageInfo], post, {
      shouldRetryOnError: false,
      errorRetryCount: 1,
    });
  
    return {
      isOlder: data,
      isLoading,
      error: error,
    };
  };