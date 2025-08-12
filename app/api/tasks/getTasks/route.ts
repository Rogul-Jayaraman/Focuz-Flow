import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type Status = "ASSIGNED" | "PROGRESS" | "COMPLETED";

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("id");

    if (!projectId) {
      return new Response(
        JSON.stringify({ message: "Project ID is required" }),
        { status: 400 }
      );
    }

    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        description: true,
        currentStatus: true,
        startTime: true,
        endTime: true,
        tasks: {
          select: {
            id: true,
            name: true,
            description: true,
            currentStatus: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error in getting tasks:", err.message);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
