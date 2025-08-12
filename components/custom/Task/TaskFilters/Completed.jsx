"use client";
import { TaskContext } from "@/components/context/TaskContextProvider";
import React, { useContext, useEffect, useState } from "react";
import filterTasks from "@/assets/functions/filterTasks";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeftFromLine, ArrowRight } from "lucide-react";
import changeStatus from "@/assets/functions/taskMethods/changeStatus";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";

const Completed = ({ tasks }) => {
  const { setReload,project } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { reloadTask } = useContext(LoadApiContext);
  useEffect(() => {
    if (tasks) {
      const filter = filterTasks(tasks, "COMPLETED");
      setFilteredTasks(filter);
    }
  }, [tasks]);
  return filteredTasks.length === 0 ? (
    <div className="flex justify-center items-center py-10 w-full">
      <h1 className="text-orange-500 text-xl font-semibold">
        No Tasks Completed
      </h1>
    </div>
  ) : (
    <div className="overflow-y-auto lg:h-[94dvh] h-max">
      {filteredTasks.map((task, ind) => {
        return (
          <div
            key={ind}
            className="p-4 hover:bg-gradient-to-t from-orange-50/70 to-white border-b-2 hover:border-b-orange-400/50 flex items-center"
          >
            <div className="w-4/5">
              <h3 className="font-semibold text-base text-gray-600">
                {task.name}
              </h3>
              <h4 className="text-gray-500 text-xs">{task.description}</h4>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    changeStatus(task.id, project.id, "PROGRESS");
                    setReload((prev) => !prev);
                    reloadTask();
                  }}
                  className="flex items-center gap-2 cursor-pointer border px-2 py-2 rounded-2xl text-xs text-gray-500  hover:bg-amber-300/30 hover:text-cyan-950"
                >
                  <ArrowLeftFromLine size={13} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move the Task to Progress</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default Completed;
