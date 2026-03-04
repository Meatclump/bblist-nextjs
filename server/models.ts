"use server"

import { db } from "@/db/drizzle"
import { model } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { success } from "zod"

export const getModels = async () => {
    const data = await db.select().from(model)
    return data
}

export const addModel = async (id: number, name: string, positionId: number, ma: number, st: number, ag: number, pa: number, av: number, cost: number) => {
    try {
        await db.insert(model).values({ id, name, positionId, ma, st, ag, pa, av, cost })
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}

export const deleteModel = async (id: number) => {
    await db.delete(model).where(eq(model.id, id))
    revalidatePath("/manage")
}

export const editModel = async (id: number, name: string, positionId: number, ma: number, st: number, ag: number, pa: number, av: number, cost: number) => {
    await db
        .update(model)
        .set({
            name,
            positionId,
            ma,
            st,
            ag,
            pa,
            av,
            cost
        })
        .where(eq(model.id, id))
    revalidatePath("/manage")
}