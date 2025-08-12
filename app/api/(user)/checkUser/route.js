"use server";
import db from "../../../../lib/prisma.js";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  //get the user from clerk
  const user = await currentUser();
  try {
    if (!user) {
      throw new Error("Unauthorized")
    }

    //check the user already exists
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      select: {
        userName: true,
      },
    });
    if (loggedInUser) {
      const userName = loggedInUser.userName;
      return new Response(JSON.stringify({ userName }), {
        status: 200,
      });
    }

    const name = user.firstName + " " + user.lastName;
    //insert the user to db
    await db.user.create({
      data: {
        clerkUserId: user.id,
        userName: user.username,
        email: user.emailAddresses[0].emailAddress,
        name,
        imageURL: user.imageUrl,
      },
    });
    const newUserName = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      select: {
        userName: true,
      },
    });
    return new Response(
      JSON.stringify({
        userName: newUserName,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Error while checking-current-user : ",err.message);
    return new Response(
      JSON.stringify({ message: "Unable to get the user" }), { status: 401 }
    );
  }
}
