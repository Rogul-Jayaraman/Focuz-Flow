"use client";
import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskContext } from "@/components/context/TaskContextProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/assets/validators/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";
import { getDate } from "@/assets/functions/getDate";

const now = new Date(getDate(new Date(),"MMM-dd-yyyy"));
const fieldSchemas = {
  title: taskSchema.pick({ title: true }),
  description: taskSchema.pick({ description: true }),
  endDate: taskSchema
    .pick({ endDate: true })
    .refine((data) => data.endDate >= now, {
      message: "End Date must be today or in the future",
      path: ["endDate"],
    }),
};

const TaskEditor = () => {
  const { isTaskEditorOpen, closeTaskEditor, editorContent} = useContext(TaskContext);
  const {reloadTask}=useContext(LoadApiContext)
  const {
    id,
    func,
    defaultValue,
    editorTitle,
    validatorField,
    prismaField,
    inputType,
    option
  } = editorContent;
  const schema = fieldSchemas[validatorField];
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    mode: "onChange",
    resolver: schema && zodResolver(schema),
    defaultValues: { [validatorField]: defaultValue },
  });
  useEffect(()=>{
    reset({
        [validatorField]:defaultValue
    })
  },[])
  const submitEditForm = (data) => {
    func(id,data[validatorField],prismaField);
    closeTaskEditor();
    reloadTask();
  }
  return (
    <Dialog open={isTaskEditorOpen} onOpenChange={closeTaskEditor}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-cyan-950">{editorTitle}</DialogTitle>
          <form onSubmit={handleSubmit(submitEditForm)}>
            <Input
              type={inputType}
              placeholder={`Enter ${validatorField}`}
              defaultValue={defaultValue}
              className="w-full p-4 my-2 text-gray-700"
              {...register(
                validatorField,
                inputType === "date" && { valueAsDate: true }
              )}
                min={inputType === "date" ? new Date().toISOString().split("T")[0] : undefined}
            />
            <div className="flex justify-start gap-6 mt-6 me-6">
              <Button type="submit" disabled={!isDirty} className="w-1/2">
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={closeTaskEditor}
                className="w-1/2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditor;
