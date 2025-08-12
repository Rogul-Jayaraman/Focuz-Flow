"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CardEdit from "./CardEdit";
import { Axe, Clock, EllipsisVerticalIcon, List, Trash2 } from "lucide-react";
import { projectEditOptions } from "@/assets/data/data";
import { getStatus } from "@/assets/functions/getStatus";
import { getDate } from "@/assets/functions/getDate";
import { calcRemDays } from "@/assets/functions/calculateRemainingDays";
import { ProjectCardContext } from "@/components/context/ProjectCardContextProvider";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";
import { useRouter } from "next/navigation";

const ProjectCard = ({ projects }) => {
  const router = useRouter();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const editBoxRef = useRef(null);
  const {
    isEditBoxOpen,
    displayEditBox,
    openEditBox,
    closeEditBox,
    openEditor,
    setEditControls,
  } = useContext(ProjectCardContext);
  const {reloadProject} = useContext(LoadApiContext);

  //handle popover outside click - close edit box
  useEffect(() => {
    const handleCloseEditBox = (event) => {
      if (
        isEditBoxOpen &&
        editBoxRef.current &&
        !editBoxRef.current.contains(event.target)
      ) {
        closeEditBox();
      }
    };
    document.addEventListener("click", handleCloseEditBox);
    return () => {
      document.removeEventListener("click", handleCloseEditBox);
    };
  }, [displayEditBox]);

  const handleDelete = async (id) => {
    setDeleteStatus(true);
    try {
      if (window.confirm("Are you sure you want to delete this event")) {
        setDeleteId(id);
        const res = await fetch("api/project/deleteProject", {
          method: "DELETE",
          headers: {
            content: "application/json",
          },
          body: JSON.stringify(id),
        });
        if (!res.ok) {
          throw new Error("Internal Server Error");
        }
        reloadProject()
      }
    } catch (err) {
      console.log("Error while Deleteing-Project : ", err.message);
    } finally {
      setDeleteStatus(false);
    }
  };

  const handleClick = (id) => {
   router.push(`/${id}/tasks`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-4 px-4">
      {projects.map((project, ind) => {
        const status = getStatus(project.currentStatus);
        const daysLeft = calcRemDays(project.startTime,project.endTime);
        return (
          <Card key={ind}>
            <CardHeader>
              <CardTitle className="text-cyan-900">{project.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={13} />
                  <p className="text-sm/3">{daysLeft}</p>
                </div>
              </CardDescription>
              <CardAction className="flex flex-col items-end gap-2">
                <Popover open={isEditBoxOpen && project.id === displayEditBox}>
                  <PopoverTrigger
                    asChild
                    className="hover:bg-orange-50 rounded-full p-2 mr-2 mb-[-0.6rem]"
                  >
                    <button
                      onClick={() => {
                        openEditBox(project.id);
                      }}
                    >
                      <EllipsisVerticalIcon size={14} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    ref={editBoxRef}
                    className="text-sm flex flex-col gap-2 p-0"
                  >
                    {projectEditOptions.map((editOption, editOptionInd) => {
                      return (
                        <button
                          key={editOptionInd}
                          onClick={() => {
                            setEditControls({
                              validatorTitle: editOption.validatorTitle,
                              cardTitle: editOption.cardTitle,
                              inputType: editOption.inputType,
                              projectField:editOption.projectField,
                              projectData: {
                                id: project.id,
                                curData: project[editOption.projectField],
                              },
                            });
                            openEditor();
                          }}
                          className="flex items-center justify-between border-b-gray-200 border-b-2 p-4 hover:border-b-orange-300/50 hover:bg-orange-50/20"
                        >
                          <p className="text-gray-600 ml-1">
                            {editOption.title}
                          </p>
                          <editOption.icon
                            size={14}
                            className="text-gray-600 mr-1"
                          />
                        </button>
                      );
                    })}
                  </PopoverContent>
                </Popover>
                <p className={`${status.color} text-xs`}>{status.status}</p>
              </CardAction>
            </CardHeader>
            <CardContent className="break-words">{project.description}</CardContent>
            <CardFooter>
              <div className="flex gap-4">
                <Button onClick={() => handleClick(project.id, status.status)}>
                  {status.status === "Assigned" ? (
                    <div className="flex items-center gap-3">
                      <Axe />
                      <p>Start</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <List />
                      <p>View Task</p>
                    </div>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(project.id);
                  }}
                >
                  <div className="flex gap-3 items-center">
                    {deleteStatus && deleteId === project.id ? (
                      <>
                        <p>Deleting...</p>
                      </>
                    ) : (
                      <>
                        <Trash2 />
                        <p>Delete</p>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
      <CardEdit />
    </div>
  );
};

export default ProjectCard;
