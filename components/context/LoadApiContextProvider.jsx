"use client"
import React, { createContext, useState } from 'react'

export const LoadApiContext = createContext(null);

const LoadApiContextProvider = ({children}) => {
  const [isProjectReload,setIsProjectReload ] = useState(false);
  const [isReloadTask,setIsReloadTask] = useState(false);

  const reloadProject = () => {
    setIsProjectReload((prev)=>!prev);
  }
  const reloadTask = () => {
    setIsReloadTask((prev)=>!prev);
  }

  const value = {isProjectReload,reloadProject,isReloadTask,reloadTask}

  return (
    <LoadApiContext.Provider value={value}>
      {children}
    </LoadApiContext.Provider>
  )
}

export default LoadApiContextProvider