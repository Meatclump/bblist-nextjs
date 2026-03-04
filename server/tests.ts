"use server"

import { db } from "@/db/drizzle"
import { test } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getData = async () => {
    const data = await db.select().from(test)
    return data
}

export const addTest = async (id: number, text: string) => {
    await db.insert(test).values({
        id,
        text
    })
}

export const deleteTest = async (id: number) => {
    await db.delete(test).where(eq(test.id, id))
    revalidatePath("/dashboard")
}

export const editTest = async (id: number, text: string) => {
    await db
        .update(test)
        .set({
            text
        })
        .where(eq(test.id, id))
    
    revalidatePath("/dashboard")
}