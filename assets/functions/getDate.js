import { format } from "date-fns";

export const getDate = (date,dateFormat) => {
  return format(new Date(date), dateFormat);
};
