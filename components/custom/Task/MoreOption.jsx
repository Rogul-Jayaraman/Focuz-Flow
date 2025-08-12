"use client";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskContext } from "@/components/context/TaskContextProvider";
import { EllipsisVertical } from "lucide-react";
import { moreOptions } from "@/assets/data/data";

const MoreOption = ({ task }) => {
  const { openTaskEditor, closeTaskEdit, setEditorContent } =
    useContext(TaskContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2">
        <EllipsisVertical size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {moreOptions.map((option, index) => (
          <div key={index}>
            {option.moreOpt ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2 justify-between text-gray-600">
                  {option.title}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-2">
                  {option.subMenu.map((subOption, subIndex) => (
                    <DropdownMenuItem
                      key={subIndex}
                      onClick={() => {
                        subOption.input &&
                          setEditorContent({
                            id: task.id,
                            defaultValue:task[subOption.input.prismaField],
                            func: subOption.func,
                            editorTitle:subOption.input.editorTitle,
                            validatorField: subOption.input.validatorField,
                            prismaField: subOption.input.prismaField,
                            inputType: subOption.input.inputType,
                            option: subOption.input.validatorField === "endDate" ? { endDate: task.endTime } : {}
                          });
                        setTimeout(() => {
                          openTaskEditor();
                        }, 1);
                        closeTaskEdit();
                      }}
                      className="flex items-center gap-8 justify-between text-gray-600" 
                    >
                      {subOption.title}
                      <subOption.icon size={15} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  option.func(task.id);
                  closeTaskEdit();
                }}
                className="flex items-center gap-2 justify-between text-gray-600"
              >
                {option.title}
                <option.icon size={15} />
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MoreOption;
