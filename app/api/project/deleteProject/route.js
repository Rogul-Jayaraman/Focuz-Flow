import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req){
    try{
        const id = await req.json();
        if(!id){
            return new Response(JSON.stringify({message:"Server Error"}),{status:500})
        }
        
        const {userId} = await auth();
        if(!userId){
            return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
        }

        const user = await db.user.findUnique({
            where : {
                clerkUserId : userId
            }
        })
        if(!user){
            return new Response(JSON.stringify({message:"User not found"}),{status:404})
        }
        await db.project.delete({
            where:{
                id
            }
        })
        return new Response(JSON.stringify({message:"Success"}),{status:200})
    }catch(err){
        console.log("Error in deleting the project",err.message);
        throw new Error(JSON.stringify({message:"Error while deleting the project"}),{status:500})
    }
}