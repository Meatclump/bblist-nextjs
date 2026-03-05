"use server"

import { db } from "@/db/drizzle"
import { teamModels } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getData = async () => {
    const data = await db.select().from(teamModels)
    return data
}

export const add = async (id: number, teamId: number, positionId: number, minModels: number, maxModels: number) => {
    try {
        await db.insert(teamModels).values({
            id,
            teamId,
            positionId,
            minModels,
            maxModels
        })
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}

export const del = async (id: number) => {
    try {
        await db.delete(teamModels).where(eq(teamModels.id, id))
        revalidatePath("/manage")
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}

export const edit = async (id: number, teamId: number, positionId: number, minModels: number, maxModels: number) => {
    await db
        .update(teamModels)
        .set({
            teamId,
            positionId,
            minModels,
            maxModels
        })
        .where(eq(teamModels.id, id))
    revalidatePath("/manage")
}