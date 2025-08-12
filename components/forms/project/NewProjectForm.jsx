"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { projectSchema } from "@/assets/validators/validators";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";

const NewProjectForm = ({ handleClose }) => {
  const {reloadProject} = useContext(LoadApiContext);
  const [buttonLoading,setButtonLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data) => {
    setButtonLoading(true);
    try {
      const finalData = JSON.stringify(data);
      const res = await fetch("/api/project/createProject", {
        method: "POST",
        headers:{
          "constent-type":"application/json"
        },
        body: finalData,
      });
      if(!res.ok){
        throw new Error("Internal Server Error - while creating-new-project");
      }
      handleClose();
    } catch (err) {
        console.log("Error while creating-new-project : ",err.message);
    }finally{
      setButtonLoading(false);
      reloadProject();
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
        {errors.title && <p className="text-sm font-base text-rose-500">{errors.title.message}</p>}
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
        {errors.description && <p className="text-sm font-base text-rose-500">{errors.description.message}</p>}
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
        />
        {errors.startDate && <p className="text-sm font-base text-rose-500">{errors.startDate.message}</p>}
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
        />
        {errors.endDate && <p className="text-sm font-base text-rose-500">{errors.endDate.message}</p>}
      </div>
      <Button type="submit" className="mt-2" disabled={buttonLoading}>
        {buttonLoading?"Creating..." : "Create Project"}
      </Button>
    </form>
  );
};

export default NewProjectForm;
