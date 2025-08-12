import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

type Status = "ASSIGNED" | "PROGRESS" | "COMPLETED";

interface TaskInput {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export async function POST(
  req: Request,
  { params }: { params: { project: string } }
): Promise<NextResponse> {  // Using NextResponse instead of Response
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const projectId = params.project;

    // Validate project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { id: true, currentStatus: true },
    });

    if (!project) {
      return NextResponse.json({ message: "Invalid Project" }, { status: 404 });
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
        projectId: project.id,
        remarks: "",
      },
    });

    // Fetch all tasks for the project to determine new status
    const tasks = await db.task.findMany({
      where: { projectId },
      select: { currentStatus: true },
    });

    let newProjectStatus: Status;
    const allCompleted = tasks.every((t) => t.currentStatus === "COMPLETED");
    const anyProgress = tasks.some((t) => t.currentStatus === "PROGRESS");
    const allAssigned = tasks.every((t) => t.currentStatus === "ASSIGNED");

    if (allCompleted) {
      newProjectStatus = "COMPLETED";
    } else if (anyProgress) {
      newProjectStatus = "PROGRESS";
    } else if (allAssigned) {
      newProjectStatus = "ASSIGNED";
    } else {
      newProjectStatus = "PROGRESS"; // mixed case
    }

    // Only update if status actually changes
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