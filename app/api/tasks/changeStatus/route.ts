import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request): Promise<Response> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const taskId: string | null = searchParams.get("task");
    const projectId: string | null = searchParams.get("project");

    if (!taskId) {
      return new Response("Task ID is required", { status: 400 });
    }
    if (!projectId) {
      return new Response("Project ID is required", { status: 400 });
    }

    // Parse request body
    const { currentStatus } = await req.json();

    // Update the task
    await db.task.update({
      where: { id: taskId },
      data: {
        currentStatus,
      },
    });

    // Fetch all tasks for this project
    const tasks = await db.task.findMany({
      where: { projectId },
      select: { currentStatus: true },
    });

    // Determine new project status
    let newProjectStatus: "ASSIGNED" | "PROGRESS" | "COMPLETED";

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
      // Default fallback if mix of ASSIGNED and COMPLETED but no PROGRESS
      newProjectStatus = "PROGRESS";
    }

    // Update the project
    await db.project.update({
      where: { id: projectId },
      data: { currentStatus: newProjectStatus },
    });

    return new Response(JSON.stringify({ message: "Task and project updated" }), {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
