"use client";
import React, { createContext, useState } from "react";
import { is } from "zod/v4/locales";

export const TaskContext = createContext(null);

const TaskContextProvider = ({ children }) => {
  const [project, setProject] = useState({});
  const [isTaskEditOpen, setIsTaskEditOpen] = useState(false);
  const [isTaskEditorOpen, setIsTaskEditorOpen] = useState(false);
  const [reload,setReload] =useState(false);
  const [editorContent, setEditorContent] = useState({
    id: "",
    func:null,
    defaultValue: "",
    editorTitle: "",
    validatorField: "",
    prismaField: "",
    inputType: "",
    option:{}
  });
  const openTaskEdit = () => {
    setIsTaskEditOpen(true);
  };
  const closeTaskEdit = () => {
    setIsTaskEditOpen(false);
  };
  const openTaskEditor = () => {
    setIsTaskEditorOpen(true);
  };
  const closeTaskEditor = () => {
    setIsTaskEditorOpen(false);
  };

  return (
    <TaskContext.Provider
      value={{
        project,
        setProject,
        isTaskEditOpen,
        openTaskEdit,
        closeTaskEdit,
        isTaskEditorOpen,
        openTaskEditor,
        closeTaskEditor,
        editorContent,
        setEditorContent,
        reload,setReload
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
