"use server";

import db from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";

export async function POST(req){
    try{
        const {userId} = await auth();
        const {title,description,startDate,endDate} = await req.json();
        if(!userId){
            return new Response(JSON.stringify({message:"unautorized"}),{status:401})
        }

        const user = await db.user.findUnique({
            where:{
                clerkUserId : userId
            }
        });

        await db.project.create({
            data:{
                name:title,
                description:description,
                startTime:startDate,
                endTime:endDate,
                currentStatus:"ASSIGNED",
                userId:user.id
            }
        });
        return new Response(JSON.stringify({message:"success"}),{status:200});
    }catch(err){
        console.log("Error while creating-user : ",err.message);
        return new Response(JSON.stringify({message:"failure"}),{status:500})
    }
} 