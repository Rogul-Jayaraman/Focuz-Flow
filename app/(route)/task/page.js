import PageNotFound from "@/app/not-found";
import TaskPage from "@/components/custom/Task/Task";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<PageNotFound />}>
        <TaskPage />
      </Suspense>
    </div>
  );
};

export default page;
