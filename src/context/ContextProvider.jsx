import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#7352FF");
  const [currentMode, setCurrentMode] = useState("Dark");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(isAuthenticated ? true : false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoading,setIsLoading] = useState(false);
   const date = new Date().toISOString().split("T")[0];
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false)
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });
  const addId = (data)=> {
    return data?.map((order,index)=>(
      {
        sl_no: data.length -index,
        ...order
      }
    ))
  }
  const excelExportProperties = (gridLength)=> {
      const properties = {
                header: {
                    headerRows: 2,
                    rows: [
                        {
                            cells: [
                                {
                                    colSpan: gridLength-1, // Adjust according to your column span
                                    value: 'TechnoRings, Shimoga',
                                    style: { fontColor: '#000000', fontSize: 22, hAlign: 'Center', bold: true }
                                }
                            ]
                        },{
                            cells: [
                                {
                                    colSpan: gridLength-1, // Adjust according to your column span
                                    value: `LIST OF MONITORING & MEASURING EQUIPMENTS INCLUDING CALIBRATION SCHEDULE & CALIBRATION HISTORY - ${user} PLANNED ON ${date}`,
                                    style: { fontColor: '#000000', fontSize: 10, hAlign: 'Center', bold: true }
                                }
                            ] 
                        }
                    ]
                }
        
                
            };
            return properties;
  }

  const { data: calibrationData, refetch,isLoadingg } = useQuery({
    queryKey: ["calibration"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/instrument-tools/`
      );
    
      return addId(response.data?.instrument_models);
    },
    staleTime: 60000, // Cache data for 1 minute
    cacheTime: 300000, // Keep data in cache for 5 minutes
  });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        calibrationData,
        refetch,
        isLoadingg,
        activeMenu,
        screenSize,
        isLoading,
        setIsLoading,
        setScreenSize,
        handleClick,
        excelExportProperties,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        addId
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
