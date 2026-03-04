"use server"

import { db } from "@/db/drizzle"
import { position } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getPositions = async () => {
    const data = await db.select().from(position)
    return data
}

export const addPosition = async (id: number, name: string) => {
    await db.insert(position).values({
        id,
        name
    })
}

export const deletePosition = async (id: number) => {
    await db.delete(position).where(eq(position.id, id))
    revalidatePath("/manage")
}

export const editPosition = async (id: number, name: string) => {
    await db
        .update(position)
        .set({
            name
        })
        .where(eq(position.id, id))
    revalidatePath("/")
}