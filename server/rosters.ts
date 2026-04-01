"use server"

import { db } from "@/db/drizzle"
import { roster } from "@/db/schema"
import getUser from "@/lib/user"
import { generateIdFromList } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getRosters = async () => {
    const data = await db.select().from(roster)
    return data
}

export const addRoster = async (name: string, teamId: number) => {
    const user = await getUser()
    if (!user) return false

    let id = 0
    try {
        const rosters = await getRosters()
        id = generateIdFromList(rosters)
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }

    try {
        await db.insert(roster).values({
            id,
            name,
            createdAt: new Date(),
            userId: user.id,
            teamId
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

export const deleteRoster = async (id: number) => {
    try {
        await db.delete(roster).where(eq(roster.id, id))
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

export const editRoster = async (id: number, name: string) => {
    try {
        await db
            .update(roster)
            .set({
                name
            })
            .where(eq(roster.id, id))
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