"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LoaderSync } from "../Loaders/Loaders";
import MoreOption from "./MoreOption";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";
import { TaskContext } from "@/components/context/TaskContextProvider";
import { Button } from "@/components/ui/button";
import { Clock, EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import { getStatus } from "@/assets/functions/getStatus";
import { calcRemDays } from "@/assets/functions/calculateRemainingDays";

const DisplayTasks = ({ projectId }) => {
  const [tasks, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isReloadTask } = useContext(LoadApiContext);
  const { setProject, project } = useContext(TaskContext);
  const editTaskRef = useRef(null)
 
  const getProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/${projectId}/getTasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Internal Server Error");
      }
      const resData = await res.json();
      setTask(resData.tasks || []);
      setProject(resData);
    } catch (err) {
      console.log("Error while getting-tasks: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [isReloadTask]);

  
  useEffect(() => {
    getProjects();
  }, []);

  if (isLoading) {
    return <div className="w-full lg:w-2xs">
      <LoaderSync />
    </div>;
  }

  const handleTaskClick = (event,taskId) => {
    if(event.target!=editTaskRef){
      window.location.href=`/task?id=${taskId}`
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between gap-8 p-4 border-b-2 border-b-gray-500/50">
        <h2 className="font-semibold text-cyan-900 text-lg">{project.name}</h2>
        {!isLoading && project?.name && (
          <Link href={`/${projectId}/tasks?newTask=true`}>
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-gray-600 flex items-center gap-1"
            >
              <span>Add Task</span>
              <Plus size={16} />
            </Button>
          </Link>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="flex justify-center items-center py-10 w-full lg:w-2xs">
          <h1 className="text-orange-500 text-xl font-semibold">
            No Tasks Found
          </h1>
        </div>
      ) : (
        <div className="">
          {tasks.map((task, index) => {
            const status = getStatus(task.currentStatus);
            const remainingDays = calcRemDays(task.startTime, task.endTime, "Task");
            return (
              <div
                onClick={(e)=>{handleTaskClick(e,task.id)}}
                key={task.id || index}
                className="cursor-pointer flex justify-between items-center border-b-2 border-b-gray-200 hover:bg-gradient-to-b from-white to-orange-50/70 hover:border-b-orange-300 p-4"
              >
                <div className="w-3/4">
                  <h3 className={`${status.color} text-base font-semibold`}>
                    {task.name}
                  </h3>
                  <div className="flex items-center text-gray-500 gap-2">
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span className="text-xs">{remainingDays}</span>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
                <div ref={editTaskRef}>
                  <MoreOption task={task} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayTasks;
