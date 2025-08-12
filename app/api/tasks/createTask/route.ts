import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Status = "ASSIGNED" | "PROGRESS" | "COMPLETED";

interface TaskInput {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
}

interface TaskStatus {
  currentStatus: Status;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const task: TaskInput = await req.json();

    // Create new task
    await db.task.create({
      data: {
        name: task.title,
        description: task.description,
        startTime: task.startDate,
        endTime: task.endDate,
        currentStatus: "ASSIGNED",
        projectId: task.projectId,
        remarks: "",
      },
    });

    // Fetch all tasks for the project with proper typing
    const tasks: {currentStatus:Status}[] = await db.task.findMany({
      where: { projectId: task.projectId },
      select: { currentStatus: true },
    });

    // Fetch current project status
    const project = await db.project.findUnique({
      where: { id: task.projectId },
      select: { currentStatus: true, id: true },
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Determine new project status based on tasks statuses
    let newProjectStatus: Status;
    const allCompleted = tasks.every((t:TaskStatus) => t.currentStatus === "COMPLETED");
    const anyProgress = tasks.some((t:TaskStatus) => t.currentStatus === "PROGRESS");
    const allAssigned = tasks.every((t:TaskStatus) => t.currentStatus === "ASSIGNED");

    if (allCompleted) {
      newProjectStatus = "COMPLETED";
    } else if (anyProgress) {
      newProjectStatus = "PROGRESS";
    } else if (allAssigned) {
      newProjectStatus = "ASSIGNED";
    } else {
      newProjectStatus = "PROGRESS"; // mixed case
    }

    // Update project status only if it changed
    if (newProjectStatus !== project.currentStatus) {
      await db.project.update({
        where: { id: project.id },
        data: {
          currentStatus: newProjectStatus,
          isDone: newProjectStatus === "COMPLETED",
        },
      });
    }

    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in creating task:", error.message);
    return NextResponse.json(
      { error: "Error in creating task" },
      { status: 500 }
    );
  }
}
