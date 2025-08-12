"use client";
import { LoadApiContext } from "@/components/context/LoadApiContextProvider";
import NewProjectForm from "@/components/forms/project/NewProjectForm";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const CreateNewProject = () => {
  const router = useRouter()
  const[isOpen,setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const create = searchParams.get("create");

  useEffect(()=>{
    if(create){
      setIsOpen(true);
    }
  },[searchParams]);
  
  const closeForm = () => {
    setIsOpen(false);
    if(searchParams.get('create')){
      router.push("/projects");
    }
  }

  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-bold text-cyan-900">
            Create New Project
          </DrawerTitle>
        </DrawerHeader>
        {/* Project Form */}
        <NewProjectForm handleClose={()=>{closeForm()}}/>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="min-w-full" onClick={closeForm}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateNewProject;
