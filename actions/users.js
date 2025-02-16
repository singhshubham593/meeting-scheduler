"use server";


import { db } from "@/lib/prisma";
import {  auth, clerkClient } from "@clerk/nextjs/server";



export async function updateUsername(username) {
    const {userId}=auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    // Check if username is already taken
    const existingUsername = await db.user.findUnique({
      where: { username },
    });
  
    if (existingUsername && existingUsername.id !== userId) {
      console.error("Username is already taken");
      throw new Error("Username is already taken");
    }
  
    // Update username in database
    await db.user.update({
      where: { clerkUserId: userId },
      data: { username },
    });
  
    // Update username in Clerk
    await clerkClient.users.updateUser(userId, {
      username,
    });
  
    return { success: true };
  }
  
export async function getUserByUsername(username) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });

  return user;
}
  
   


