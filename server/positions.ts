"use server"

import { db } from "@/db/drizzle"
import { position } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getPositions = async () => {
    const data = await db.select().from(position)
    return data
}

export const addPosition = async (id: number, name: string) => {
    try {
        await db.insert(position).values({
            id,
            name
        })
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

export const deletePosition = async (id: number) => {
    try {
        await db.delete(position).where(eq(position.id, id))
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

export const editPosition = async (id: number, name: string) => {
    try {
        await db
            .update(position)
            .set({
                name
            })
            .where(eq(position.id, id))
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