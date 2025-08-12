import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request: Request): Promise<Response> {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const taskId:string|null = searchParams.get("id");
        if (!taskId) {
            return new Response("Task ID is required", { status: 400 });
        }
        
        const {data,field} = await request.json();
        if (!data&&!field) {
            return new Response("Data or field is required", { status: 400 });
        }

        const task = await db.task.findUnique({
            where: { id: taskId },
            select:{ id : true }  
        });
        if (!task) {
            return new Response("Task not found", { status: 404 }); 
        }
        await db.task.update({
            where: { id: taskId },
            data:{[field]:data}
        });
        return new Response("Task description updated successfully", { status: 200 });
    } catch (err: any) {
        console.log("Error while editing task description:", err.message);
        return new Response(err.message, { status: 500 });
    }
}