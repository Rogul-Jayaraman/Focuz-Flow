import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: Request): Promise<Response> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("id");
    if (!taskId) {
      return new Response("Task ID is required", { status: 400 });
    }

    try {
      await db.task.delete({
        where: { id: taskId },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        // Prisma error code for "Record to delete does not exist"
        return new Response("Task not found", { status: 404 });
      }
      throw error; // rethrow if unexpected error
    }

    return new Response("Task deleted successfully", { status: 200 });
  } catch (err: any) {
    console.log("Error in deleting task:", err.message);
    return new Response(err.message, { status: 500 });
  }
}
