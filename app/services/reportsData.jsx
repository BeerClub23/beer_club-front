import Cookies from "js-cookie";
import useSWR from "swr";

const get = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((r) => r.json());

export const useGetReportingData = () => {
  const token = Cookies.get("jwt");
  const { data, error, isLoading } = useSWR(
    // `${process.env.NEXT_PUBLIC_API_URL}filters/users/filterGlobalData?typeSubscription=Especialista&paymentStatus=APROBADO`,
    `${process.env.NEXT_PUBLIC_API_URL}filters/users/filterGlobalData`,
    (url) => get(url, token),
    {
      fallbackData: [],
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    reportingData: data,
    isLoadingTop: isLoading,
    isErrorTop: error,
  };
};

export const useGetReportingDataFiltered = (url) => {
  const token = Cookies.get("jwt");
  const { data, error, isLoading } = useSWR(
    // `${process.env.NEXT_PUBLIC_API_URL}filters/users/filterGlobalData?typeSubscription=Especialista&paymentStatus=APROBADO`,
    `${process.env.NEXT_PUBLIC_API_URL}filters/users/filterGlobalData?${url}`,
    (url) => get(url, token),
    {
      fallbackData: [],
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    reportingDataFilter: data,
    isLoadingTop: isLoading,
    isErrorTop: error,
  };
};

export const useGetReportingUsers = () => {
  const token = Cookies.get("jwt");
  const { data, error, isLoading } = useSWR(
    // `${process.env.NEXT_PUBLIC_API_URL}filters/users/filterGlobalData?typeSubscription=Especialista&paymentStatus=APROBADO`,
    `${process.env.NEXT_PUBLIC_API_URL}users/all`,
    (url) => get(url, token),
    {
      fallbackData: [],
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  return {
    usersData: data,
    isLoadingTop: isLoading,
    isErrorTop: error,
  };
};
