import { CalendarCog, FilePen, Pen, Trash } from "lucide-react";
import editTask from "../functions/taskMethods/editTask";
import deleteTask from "../functions/taskMethods/delete";

export const projectEditOptions = [
  {
    validatorTitle: "title",
    cardTitle: "Edit Project Title",
    inputType:"text",
    projectField:"name",
    title:"Edit Title",
    icon: Pen,
  },
  {
    validatorTitle: "description",
    cardTitle: "Edit Project Description",
    inputType:"text",
    projectField:"description",
    title:"Edit Description",
    icon: FilePen,
  },
  {
    validatorTitle: "endDate",
    cardTitle: "Edit Project End Date",
    inputType:"date",
    projectField:"endTime",
    title:"Change Duration",
    icon: CalendarCog,
  },
];

export const moreOptions = [{
  title: "Edit Task",
  icon: Pen,
  moreOpt:true,
  subMenu : [
    {
      title: "Edit Task Title",
      icon: Pen,
      onclick: "editTitle",
      func:editTask,
      reqInput: true,
      input:{
        editorTitle: "Edit Task Title",
        validatorField: "title",
        prismaField: "name",
        inputType: "text",
      }
    },
    {
      title: "Edit Task Description",
      icon: FilePen,
      onclick: "editDescription",
      func:editTask,
      reqInput: true,
      input:{
        editorTitle: "Edit Task Description",
        validatorField: "description",
        prismaField: "description",
        inputType: "text",
      }
    },
    {
      title: "Change Task Duration",
      icon: CalendarCog,
      onclick: "changeDuration",
      func:editTask,
      reqInput: true,
      input:{
        editorTitle: "Change Task Duration",
        validatorField: "endDate",
        prismaField: "endTime",
        inputType: "date",
      }
    }
  ]
},{
  title: "Delete",
  icon: Trash,
  moreOpt:false,
  func:deleteTask,
  onclick: "deleteTask",
}]