"use-client";
import React, { createContext, useState, UseContext, useContext } from "react";
export const GlobalContext = createContext();
import themes from "./themes";
import axios from "axios";
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      console.log(res.data);
      setTasks(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      // toast.error("Something went Wrong");
    }
  };
  React.useEffect(() => {
    allTasks();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
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
