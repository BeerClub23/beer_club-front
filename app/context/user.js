"use client"
import { useJwt } from "react-jwt";
import { createContext, useContext, useState } from "react";
import cookie from 'cookie-cutter';
export const UserBeerContext = createContext({});


export const UserContext = () => {
    const [ user, setUser ] = useState();
    const token = cookie.get("jwt");

    if (token) {
        const { decodedToken, isExpired } = useJwt(token);
    } else {
        setUser(null);
    }

    return (
        <UserBeerContext.Provider value={ user }>
          {children}
        </UserBeerContext.Provider>
      );
}

export const useUserContext = () => useContext(UserBeerContext);

