import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("project");

    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find internal user ID from Clerk userId
    const user = await db.user.findFirst({
      where: { clerkUserId: userId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const id = user.id;

    if (!projectId) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    // Check if project belongs to user (recommended)
    const project = await db.project.findFirst({
      where: { id: projectId },
      select: { id: true, userId: true },
    });

    if (!project || project.userId !== id) {
      return NextResponse.json({ message: "Project not found or access denied" }, { status: 403 });
    }

    // Fetch tasks for the project
    const tasks = await db.task.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
