import React, { Suspense } from "react";
import DisplayTasks from "@/components/custom/Task/DisplayTasks";
import CreateNewTask from "@/components/custom/Task/CreateNewTask";
import TaskContextProvider from "@/components/context/TaskContextProvider";
import TaskEditor from "@/components/custom/Task/TaskEditor";
import TaskWithStatus from "@/components/custom/Task/TaskWithStatus";
import { List } from "lucide-react";
import PageNotFound from "@/app/not-found";

const Page = async ({ params }) => {
  const { project } = await params;

  return (
    <TaskContextProvider>
      <div className="hidden lg:grid grid-cols-1">
        <div className="col-end-1 h-[100dvh] border-r-2 border-r-gray-500/50 bg-white/70">
          <DisplayTasks projectId={project} />
        </div>
        <div className="col-end-2 h-[100dvh] w-full border-r-2 bg-white/70">
          <TaskWithStatus />
        </div>
      </div>

      <div className="lg:hidden w-full">
        <TaskWithStatus projectID={project} />
      </div>

      {/* Add the modal component */}
      <Suspense fallback={<PageNotFound />}>
        <CreateNewTask />
      </Suspense>

      {/* Add the task edit component */}
      <TaskEditor />
    </TaskContextProvider>
  );
};

export default Page;
