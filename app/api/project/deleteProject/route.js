import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing project ID" }), {
        status: 400,
      });
    }

    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Delete all tasks associated with the project
    await db.task.deleteMany({
      where: { projectId: id },
    });

    // Delete the project itself
    await db.project.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error in deleting the project", err.message);
    return new Response(
      JSON.stringify({ message: "Error while deleting the project" }),
      { status: 500 }
    );
  }
}
