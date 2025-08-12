import { differenceInDays } from "date-fns";
import { getDate } from "./getDate";
export const calcRemDays = (start, end, tag) => {
  const st = getDate(start, "MMM dd, yyyy");
  const ed = getDate(end, "MMM dd, yyyy");
  const now = getDate(new Date(), "MMM dd, yyyy");
  if(ed===now){
    return "Today left"
  }
  if (ed< now) {
    return "Time limit exceeded";
  }
  if (now < st) {
    if(!tag){
      return "Project not started";
    }3
    return tag+" not started";
  }
  const rem = differenceInDays(new Date(ed), now);
  return rem + " days left";
};
