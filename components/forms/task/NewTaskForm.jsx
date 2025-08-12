"use client";
import { taskSchema } from "@/assets/validators/validators";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";
import { TaskContext } from "@/components/context/TaskContextProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const NewTaskForm = ({ closeTask }) => {
  const { setReload,project } = useContext(TaskContext);
  const {reloadTask} = useContext(LoadApiContext);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async(data) => {
    setIsSubmitting(true);
    try{
      const res = await fetch(`/api/tasks/createTask`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          projectId: project.id,
        }),
      })
      if(!res.ok){
        throw new Error("Failed to create task");
      }
      closeTask();
      setReload((prev)=>!prev)
      reloadTask();
    }catch(err) {
      console.error("Error while creating task:", err.message);
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className="px-5 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold text-gray-700">
          Title
        </label>
        <Input
          className="text-sm font-base text-gray-600"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm font-base text-rose-500">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-gray-700"
        >
          Description
        </label>
        <Input
          className="text-sm font-base text-gray-600"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm font-base text-rose-500">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="startDate"
          className="text-sm font-semibold text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          className="DateInput"
          {...register("startDate", { valueAsDate: true })}
          min={project.startTime?.split("T")[0]>new Date().toISOString().split("T")[0]? project.startTime?.split("T")[0] : new Date().toISOString().split("T")[0]}
          max={project.endTime?.split("T")[0]}
        />
        {errors.startDate && (
          <p className="text-sm font-base text-rose-500">
            {errors.startDate.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="endDate"
          className="text-sm font-semibold text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          className="DateInput"
          {...register("endDate", { valueAsDate: true })}
          min={project.startTime?.split("T")[0]>new Date().toISOString().split("T")[0]? project.startTime?.split("T")[0] : new Date().toISOString().split("T")[0]}
          max={project.endTime?.split("T")[0]}
        />
        {errors.endDate && (
          <p className="text-sm font-base text-rose-500">
            {errors.endDate.message}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="mt-2 w-1/2" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={closeTask}
          className="mt-2 w-1/2   "
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewTaskForm;
