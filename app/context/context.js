"use client"
import { createContext, useContext, useState } from "react";
export const BeerClubContext = createContext({});

export const AppContext = ({ children }) => {
    const [context, setContext] = useState();
  
    return (
      <BeerClubContext.Provider value={{ context, setContext }}>
        {children}
      </BeerClubContext.Provider>
    );
}

export const useAppContext = () => useContext(BeerClubContext)