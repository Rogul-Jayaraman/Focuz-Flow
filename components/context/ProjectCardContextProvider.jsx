"use client"
import React, { createContext, useState } from "react";

//store values used by useContext
export const ProjectCardContext = createContext(null);

//provider component wrap - parent component
const ProjectCardContextProvider = ({ children }) => {
  //EditBox -> container that show list of edit options
  const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);
  //displayEditBox -> store id of Project to display editBox
  const [displayEditBox, setDisplayEditBox] = useState(null);
  //card editor -> contains form
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  //open & close the editbox
  const openEditBox = (id) => {
    setDisplayEditBox(id);
    setIsEditBoxOpen(true);
  };
  const closeEditBox = () => {
    setDisplayEditBox(null);
    setIsEditBoxOpen(false);
  };
  const [editControls, setEditControls] = useState({
    validatorTitle: null,
    cardTitle: null,
    inputType: null,
    projectField:null,
    projectData: {
      id: null,
      curData: null,
    },
  });
  const openEditor = () => {
    closeEditBox();
    setIsEditorOpen(true);
  };
  const closeEditor = () => {
    setEditControls({
      validatorTitle: null,
      cardTitle: null,
      inputType: null,
      projectField:null,
      projectData: {
        id: null,
        curData: null,
      },
    });
    setIsEditorOpen(false);
  };

  const context_value = {
    displayEditBox,
    isEditBoxOpen,
    openEditBox,
    closeEditBox,
    isEditorOpen,
    openEditor,
    closeEditor,
    editControls,
    setEditControls,
  };

  return (
    <ProjectCardContext.Provider value={context_value}>
      {children}
    </ProjectCardContext.Provider>
  );
};

export default ProjectCardContextProvider;
