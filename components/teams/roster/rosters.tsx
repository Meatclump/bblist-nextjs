"use client"

import AddRoster from "./addRoster"
import { FC, useState } from "react"
import DeleteRoster from "./deleteRoster"
import RenameRoster from "./renameRoster"
import { roster } from "@/app/types/roster"
import { addRoster, deleteRoster, editRoster } from "@/server/rosters"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { team } from "@/app/types/team"

interface Props {
    rosters: roster[]
    teams: team[]
}

const Rosters: FC<Props> = ({ rosters, teams }) => {
    const [rosterList, setRosterList] = useState<roster[]>(rosters)

    const createRoster = (name: string, teamId: number) => {
        let id = (rosterList.at(-1)?.id || 0) + 1
        rosterList.forEach(roster => {
            if (id <= roster.id) {
                id = roster.id +1
            }
        })
        addRoster(id, name, teamId)
        setRosterList(prev => [...prev, { id, name, createdAt: new Date(), userId: "", teamId }])
    }

    const renameRoster = (id: number, name: string) => {
        setRosterList(prev => prev.map(team => team.id === id ? { ...team, name } : team))
        editRoster(id, name)
    }

    const deleteRosterItem = (id: number) => {
        setRosterList(prev => prev.filter(team => team.id !== id))
        deleteRoster(id)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddRoster createRoster={createRoster} teams={teams} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <ul className="flex flex-col text-sm">
                {rosterList.map(roster => (
                    <li key={`${roster.id}-${roster.name}`} className="not-last:border-b py-1.5 flex items-center justify-between gap-3">
                        <Button variant={"default"}>
                            <Link href={`/roster/${roster.id}`}>{roster.name}</Link>
                        </Button>
                        <div className="flex-1 text-start">Team: {teams.find(t => t.id === roster.teamId)?.name}</div>
                        <div className="flex gap-1">
                            <RenameRoster renameRoster={renameRoster} itemId={roster.id} />
                            <DeleteRoster deleteRoster={deleteRosterItem} itemId={roster.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Rosters