"use client"

import { model } from "@/app/types/model"
import { team } from "@/app/types/team"
import { teamModels } from "@/app/types/teamModels"
import { add, del, edit } from "@/server/teamModels"
// import AddModel from "./addModel"
import { FC, useState } from "react"
// import DeleteModel from "./deleteModel"
// import EditModel from "./editModel"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AddTeamModels from "./addTeamModels"
import { position } from "@/app/types/position"
import DeleteTeamModels from "./deleteTeamModels"

interface Props {
    teamModels: teamModels[]
    positions: position[]
    teams: team[]
}

const TeamModels: FC<Props> = ({ teamModels, positions, teams }) => {
    const [teamModelsList, setteamModelsList] = useState<teamModels[]>(teamModels)

    const createTeamModels = async (teamId: number, positionId: number, minModels: number, maxModels: number) => {
        let id = (teamModelsList.at(-1)?.id || 0) + 1
        teamModelsList.forEach(teamModels => {
            if (id <= teamModels.id) {
                id = teamModels.id +1
            }
        })
        const res = await add(id, teamId, positionId, minModels, maxModels)
        if (res.success) {
            setteamModelsList(prev => [...prev, { id, teamId, positionId, minModels, maxModels }])
            toast.success(`Successfully added item` as string)
        } else {
            toast.error("Unable to add model" as string)
        }
    }

    const editModel = (id: number, name: string) => {
        setteamModelsList(prev => prev.map(model => model.id === id ? { ...model, name } : model))
        // editModel(id, name)
    }

    const deleteTeamModels = async (id: number) => {
        setteamModelsList(prev => prev.filter(model => model.id !== id))
        const res = await del(id)
        if (res.success) {
            toast.success("Successfully deleted item")
        } else {
            toast.error("Unable to delete item")
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddTeamModels createTeamModels={createTeamModels} teams={teams} positions={positions} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">Team</TableHead>
                        <TableHead className="text-start">Position</TableHead>
                        <TableHead className="text-start">Min Models</TableHead>
                        <TableHead className="text-start">Max Models</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {teamModelsList.map(tm => (
                    <TableRow key={`${tm.id}-${tm.teamId}-${tm.positionId}`}>
                        <TableCell className="text-start">{teams.find(t => t.id === tm.teamId)?.name}</TableCell>
                        <TableCell className="text-start">{positions.find(pos => pos.id === tm.positionId)?.name}</TableCell>
                        <TableCell className="text-start">{tm.minModels}</TableCell>
                        <TableCell className="text-start">{tm.maxModels}</TableCell>
                        <TableCell className="text-start">
                            <DeleteTeamModels deleteTeamModels={deleteTeamModels} itemId={tm.id} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamModels