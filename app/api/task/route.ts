import db from "@/lib/prisma";

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("id");

    if (!taskId) {
      return new Response(JSON.stringify({ message: "Task ID is required" }), {
        status: 400,
      });
    }

    const task = await db.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        name: true,
        description: true,
        currentStatus: true,
        startTime: true,
        endTime: true,
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!task) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(task), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error fetching task details:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
