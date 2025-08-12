"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import NewTaskForm from "@/components/forms/task/NewTaskForm";

const CreateNewTask = () => {
    const [isOpen,setIsOpen] = useState(false); 
    const searchParams = useSearchParams();
    const newTask = searchParams.get("newTask");
    const router = useRouter();
    useEffect(()=>{
        if(newTask){
            setIsOpen(true);
        }
    },[searchParams])
    const handleClose = () => {
        setIsOpen(false);
        if(searchParams.get('newTask')){
          router.push(window.location.pathname);
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogContent className="px-3 py-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-cyan-900 text-center">Add New Task</DialogTitle>
            <NewTaskForm closeTask={()=>handleClose()}/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewTask;
