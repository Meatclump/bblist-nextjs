"use server"

import { db } from "@/db/drizzle"
import { roster } from "@/db/schema"
import getUser from "@/lib/user"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getRosters = async () => {
    const data = await db.select().from(roster)
    return data
}

export const addRoster = async (id: number, name: string, teamId: number) => {
    const user = await getUser()
    if (!user) return false
    await db.insert(roster).values({
        id,
        name,
        createdAt: new Date(),
        userId: user.id,
        teamId
    })
}

export const deleteRoster = async (id: number) => {
    await db.delete(roster).where(eq(roster.id, id))
    revalidatePath("/dashboard")
}

export const editRoster = async (id: number, name: string) => {
    await db
        .update(roster)
        .set({
            name
        })
        .where(eq(roster.id, id))
    revalidatePath("/dashboard")
}