"use server"

import { db } from "@/db/drizzle"
import { team } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getTeams = async () => {
    const data = await db.select().from(team)
    return data
}

export const addTeam = async (id: number, name: string) => {
    await db.insert(team).values({
        id,
        name
    })
}

export const deleteTeam = async (id: number) => {
    await db.delete(team).where(eq(team.id, id))
    revalidatePath("/manage")
}

export const editTeam = async (id: number, name: string) => {
    await db
        .update(team)
        .set({
            name
        })
        .where(eq(team.id, id))
    revalidatePath("/")
}