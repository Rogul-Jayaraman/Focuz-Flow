"use client";
import React, { useContext, useEffect, useState } from "react";
import Assigned from "@/components/custom/Task/TaskFilters/Assigned";
import Progress from "@/components/custom/Task/TaskFilters/Progress";
import Completed from "@/components/custom/Task/TaskFilters/Completed";
import { TaskContext } from "@/components/context/TaskContextProvider";
import fetchTask from "@/assets/functions/taskMethods/fetchTask";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisplayTasks from "./DisplayTasks";

const TaskWithStatus = ({projectID}) => {
  const { reload, project } = useContext(TaskContext);
  const [task, setTask] = useState([]);
  const projectId = project?.id;
  useEffect(() => {
    if (!projectId) return;

    const fetchTasks = async () => {
      try {
        const tasks = await fetchTask(projectId);
        setTask(tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    fetchTasks();
  }, [reload, projectId]);

  return (
    task && (
      <div>
        <div className="hidden lg:grid h-[100vh] lg:grid-cols-3 ">
          <div className="w-full  border-r-2 border-r-gray-500/50">
            <div className="border-b-2 border-b-gray-500/50 p-4.5">
              <h3 className="text-lg text-cyan-900 font-semibold text-center">
                Assigned
              </h3>
            </div>
            <div>
              <Assigned tasks={task} />
            </div>
          </div>
          <div className="w-full border-r-2 border-r-gray-500/50">
            <div className="border-b-2 border-b-gray-500/50 p-4.5">
              <h3 className="text-lg text-cyan-900 font-semibold text-center">
                Progress
              </h3>
            </div>
            <div>
              <Progress tasks={task} />
            </div>
          </div>
          <div className="w-full border-r-2">
            <div className="border-b-2 border-b-gray-500/50 p-4.5">
              <h3 className="text-lg text-cyan-900 font-semibold text-center">
                Completed
              </h3>
            </div>
            <div>
              <Completed tasks={task} />
            </div>
          </div>
        </div>
        {/* Mobile view */}
        <div className="flex lg:hidden"> 
          <Tabs defaultValue="projectTasks" className="w-full">
          <TabsList className="h-15 w-full flex gap-0 md:gap-4 bg-inherit justify-between border-b-2 border-b-gray-500/70 rounded-b-none pb-[4]">
            <TabsTrigger className="text-gray-700" value="projectTasks">Tasks</TabsTrigger>
            <TabsTrigger className="text-gray-700" value="assigned">Assigned</TabsTrigger>
            <TabsTrigger className="text-gray-700" value="progress">Progress</TabsTrigger>
            <TabsTrigger className="text-gray-700" value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="projectTasks">
            <DisplayTasks projectId={projectID}/>
          </TabsContent>
          <TabsContent value="assigned">
            <Assigned tasks={task}/>
          </TabsContent>
          <TabsContent value="progress">
            <Progress tasks={task}/>
          </TabsContent>
          <TabsContent value="completed">
            <Completed tasks={task}/>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    )
  );
};

export default TaskWithStatus;
