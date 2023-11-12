"use client"
import { createContext, useContext, useState } from "react";
export const UserBeerClubContext = createContext({});


export const UserBeerContext = ({children}) => {
    const [ user, setUser ] = useState();
    

    return (
        <UserBeerClubContext.Provider value={{user, setUser}}>
            {children}
        </UserBeerClubContext.Provider>
      );
}

export const useUserBeerContext = () => useContext(UserBeerClubContext);

