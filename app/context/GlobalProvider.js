"use-client";
import React, { createContext, useState, UseContext, useContext } from "react";
export const GlobalContext = createContext();
import themes from "./themes";
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  return (
    <GlobalContext.Provider
      value={{
        theme,
      }}
    >
    <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
