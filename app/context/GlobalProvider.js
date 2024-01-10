"use-client";
import React, { createContext, useState, UseContext, useContext } from "react";
export const GlobalContext = createContext();
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("TaskDeleted");
      allTasks();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
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
    if (user) allTasks();
  }, [user]);
  const importantTasks = tasks.filter((tasks) => tasks.isImportant === true);
  // console.log(importantTasks,"important");
  const completedTasks = tasks.filter((tasks) => tasks.isCompleted === true);
  // console.log(completedTasks, "completed");
  const incompleteTasks = tasks.filter((tasks) => tasks.isCompleted === false);
  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
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
