import { z } from "zod";

// Normalize today's date to midnight
const today = new Date();
today.setHours(0, 0, 0, 0);

export const projectSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(50, "Title must be less than 50 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(100, "Description must be less than 100 characters"),
    startDate: z.date({ required_error: "Start Date is required" }),
    endDate: z.date({ required_error: "End Date is required" }),
  })
  .refine((data) => data.startDate >= today, {
    message: "Start Date must be today or in the future",
    path: ["startDate"],
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End Date must be greater than Start Date",
    path: ["endDate"],
  });

export const taskSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(50, "Title must be less than 50 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(100, "Description must be less than 100 characters"),
    startDate: z.date({ required_error: "Start Date is required" }),
    endDate: z.date({ required_error: "End Date is required" }),
  })
  .refine((data) => data.startDate >= today, {
    message: "Start Date must be today or in the future",
    path: ["startDate"],
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End Date must be greater than or equal to Start Date",
    path: ["endDate"],
  });
