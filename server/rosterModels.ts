"use server"

import { db } from "@/db/drizzle"
import { rosterModel } from "@/db/schema"
import getUser from "@/lib/user"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getRosterModels = async () => {
    const data = await db.select().from(rosterModel)
    return data
}

export const addRosterModel = async (id: number, rosterId: number, modelId: number, playerNumber: number) => {
    const user = await getUser()
    if (!user) return false
    const res = await db.insert(rosterModel).values({
        id,
        rosterId,
        modelId,
        playerNumber
    })
}

export const deleteRosterModel = async (id: number) => {
    await db.delete(rosterModel).where(eq(rosterModel.id, id))
    revalidatePath(`/roster`)
}

export const editRoster = async (id: number, playerNumber: number) => {
    await db
        .update(rosterModel)
        .set({
            playerNumber
        })
        .where(eq(rosterModel.id, id))
    revalidatePath("/dashboard")
}