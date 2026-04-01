"use server"

import { db } from "@/db/drizzle"
import { rosterModel } from "@/db/schema"
import getUser from "@/lib/user"
import { generateIdFromList } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getRosterModels = async () => {
    const data = await db.select().from(rosterModel)
    return data
}

export const addRosterModel = async (rosterId: number, modelId: number, playerNumber: number) => {
    // Verify user
    const user = await getUser()
    if (!user) return false

    // Generate available ID
    let id = 0
    try {
        const rosterModels = await getRosterModels()
        id = generateIdFromList(rosterModels)
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }

    // Insert into DB
    try {
        await db.insert(rosterModel).values({
            id,
            rosterId,
            modelId,
            playerNumber
        })
        return {
            success: true,
            id
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
}

export const deleteRosterModel = async (id: number) => {
    try {
        await db.delete(rosterModel).where(eq(rosterModel.id, id))
        return {
            success: true
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
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