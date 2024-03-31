import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchRansomwareData } from "./api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetchRansomwareData();
      setData(rawData);
    };
    loadData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
