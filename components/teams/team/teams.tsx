"use client"

import { team } from "@/app/types/team"
import { addTeam, deleteTeam, editTeam } from "@/server/teams"
import AddTeam from "./addTeam"
import { FC, useState } from "react"
import DeleteTeam from "./deleteTeam"
import RenameTeam from "./renameTeam"
import { toast } from "sonner"

interface Props {
    teams: team[]
}

const Teams: FC<Props> = ({ teams }) => {
    const [teamList, setTeamList] = useState<team[]>(teams)

    const createTeam = async (name: string) => {
        let id = 0
        teamList.forEach(team => {
            if (id <= team.id) {
                id = team.id + 1
            }
        })
        const res = await addTeam(id, name)
        if (res.success) {
            setTeamList(prev => [...prev, { id: id, name }])
            toast.success(`Successfully added team: ${name}` as string)
        } else {
            toast.error("Unable to add team" as string)
        }
    }

    const renameTeam = (id: number, name: string) => {
        setTeamList(prev => prev.map(team => team.id === id ? { ...team, name } : team))
        editTeam(id, name)
    }

    const deleteTeamItem = (id: number) => {
        setTeamList(prev => prev.filter(team => team.id !== id))
        deleteTeam(id)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddTeam createTeam={createTeam} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <ul className="flex flex-col text-sm">
                {teamList.map(team => (
                    <li key={`${team.id}-${team.name}`} className="not-last:border-b p-1.5 flex items-center justify-between">
                        <span>{team.name}</span>
                        <div className="flex gap-1">
                            <RenameTeam renameTeam={renameTeam} itemId={team.id} />
                            <DeleteTeam deleteTeam={deleteTeamItem} itemId={team.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Teams