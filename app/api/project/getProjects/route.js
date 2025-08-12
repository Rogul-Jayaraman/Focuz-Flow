"use server";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(){
    try{
        const {userId}=await auth();
        if(!userId){
             return new Response(JSON.stringify({message:"unautorized"}),{status:401});
        }
        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId
            }
        });
        if(!user){
            return new Response(JSON.stringify({message:"User not found"}),{status:404});
        }
        const project = await db.project.findMany({
            where:{
                userId:user.id
            },
            select:{
                id:true,
                name:true,
                description:true,
                startTime:true,
                endTime:true,
                currentStatus:true,
                tasks:{
                    select:{
                        name:true,
                        description:true,
                        startTime:true,
                        endTime:true,
                        currentStatus:true
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        });

        return new Response(JSON.stringify({project}),{status:200})
    }catch(err){
        console.log("Error while getting-projects : ",err.message);
        return new Response(JSON.stringify({message:"failure"}),{status:500});
    }
}