import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request): Promise<Response> {
  type resData = { id: string; field: string; data: string };

  try {
    const { id, field, data }: resData = await req.json();
    // if(!id||!field||!data){
    //     throw new Error("Invalid Data");
    // }

    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Get the user object or null
    const user: { id: string } | null = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const project:{id:string}|null = await db.project.findUnique({
        where:{
            id:id
        },
        select:{
            id:true
        }
    });
    if(!project){
        return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    await db.project.update({
        where:{id:project.id},
        data:{
            [field]:data
        }
    })

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in PATCH:", err.message);
    } else {
      console.error("Unknown error in PATCH:", err);
    }
    return new Response(JSON.stringify({ message: "Error in updating-the-project" }), {
      status: 500,
    });
  }
}
