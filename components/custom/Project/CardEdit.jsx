"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectCardContext } from "@/components/context/ProjectCardContextProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { projectSchema } from "@/assets/validators/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDate } from "@/assets/functions/getDate";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";

const now = new Date(getDate(new Date(),"MMM-dd-yyyy"));
const fieldSchemas = {
  title: projectSchema.pick({ title: true }),
  description: projectSchema.pick({ description: true }),
  endDate: projectSchema.pick({ endDate: true }).refine(
    (data)=> data.endDate>=now,{
      message:"End Date must be today or in the future",
      path:["endDate"]
    }
  ),
};

const CardEdit = () => {
  const { isEditorOpen, editControls, closeEditor } = useContext(ProjectCardContext);
  const {reloadProject} = useContext(LoadApiContext);
  const { validatorTitle, cardTitle, inputType, projectField, projectData } = editControls;

  const getFormattedValue = () => {
    if (inputType === "date" && projectData?.curData) {
      return projectData.curData.split("T")[0];
    }
    return projectData?.curData || "";
  };
  //prevent zod resolver undefined
  const schema = fieldSchemas[validatorTitle];
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "onChange", // validate as the user types
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: {
      [validatorTitle]: getFormattedValue(),
    },
  });

  // When the dialog opens/closes or projectData changes, reset the form
  //set default values
  useEffect(() => {
    reset({
      [validatorTitle]: getFormattedValue(),
    });
  }, [projectData, validatorTitle, inputType, reset]);

  const onSubmit = async(data) => {
    const parsingData = {
      id: projectData.id,
      field: projectField,
      data: data[validatorTitle],
    };
    try{
      const res = await fetch("/api/project/editProject",{
        method:"PATCH",
        headers:{"content":"application/json"},
        body:JSON.stringify(parsingData)
      });
      if(!res.ok){
        throw new Error("Internal Server Error");
      }
      closeEditor();
      reloadProject();
    }catch(err){
      console.log("Error while updating the project : ",err.message)
    }
  };

  return (
    <Dialog
      open={isEditorOpen}
      onOpenChange={() => {
        closeEditor();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-cyan-950">
            {cardTitle}
          </DialogTitle>
          <DialogDescription></DialogDescription>

          {validatorTitle && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-1">
              <Input
                type={inputType}
                placeholder={`Enter new ${validatorTitle?.toLowerCase()}`}
                {...register(
                  validatorTitle,
                  inputType === "date" ? { valueAsDate: true } : {}
                )}
                className="text-gray-700"
              />
              {errors[validatorTitle] && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors[validatorTitle]?.message}
                </p>
              )}

              <div className="flex flex-col md:flex-row items-center gap-4 mt-4 justify-end">
                <Button
                  type="submit"
                  disabled={!isDirty}
                  className="w-full md:w-fit"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    closeEditor();
                  }}
                  variant="outline"
                  className="w-full md:w-fit"
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CardEdit;
