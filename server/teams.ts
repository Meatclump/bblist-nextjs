"use server"

import { db } from "@/db/drizzle"
import { team } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getTeams = async () => {
    const data = await db.select().from(team)
    return data
}

export const addTeam = async (id: number, name: string) => {
    try {
        await db.insert(team).values({
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

export const deleteTeam = async (id: number) => {
    try {
        await db.delete(team).where(eq(team.id, id))
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}

export const editTeam = async (id: number, name: string) => {
    try {
        await db
            .update(team)
            .set({
                name
            })
            .where(eq(team.id, id))
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