"use client";
import React, { useContext, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import LoaderBar from "../Loaders/Loaders";
import ProjectCardContextProvider from "@/components/context/ProjectCardContextProvider";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";

const DisplayProject = () => {
  const {isProjectReload} = useContext(LoadApiContext);
  const [loadingProject, setLoadingProject] = useState(false);
  const [projects, setProject] = useState([]);

  const getProjects = async () => {
    setLoadingProject(true);
    try {
      const res = await fetch("/api/project/getProjects");
      if (!res.ok) {
        throw new Error("Internal Server Error");
      }
      const { project } = await res.json();
      setProject(project);
    } catch (err) {
      console.log("Error while getting-projects : ", err.message);
    } finally {
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [isProjectReload]);

  return loadingProject ? (
    <LoaderBar />
  ) : (
    <div className="h-screen relative overflow-hidden">
      <h3 className="text-orange-600/90 text-center mt-4 lg:mt-8 lg:mb-4 text-lg lg:text-3xl font-bold  ">
        My Projects
      </h3>
      <ProjectCardContextProvider>
        <ProjectCard projects={projects} />
      </ProjectCardContextProvider>
    </div>
  );
};

export default DisplayProject;
