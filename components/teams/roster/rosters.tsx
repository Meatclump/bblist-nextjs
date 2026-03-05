"use client"

import AddRoster from "./addRoster"
import { FC, useState } from "react"
import DeleteRoster from "./deleteRoster"
import RenameRoster from "./renameRoster"
import { roster } from "@/app/types/roster"
import { addRoster, deleteRoster, editRoster } from "@/server/rosters"

interface Props {
    rosters: roster[]
}

const Rosters: FC<Props> = ({ rosters }) => {
    const [rosterList, setRosterList] = useState<roster[]>(rosters)

    const createRoster = (name: string) => {
        let id = (rosterList.at(-1)?.id || 0) + 1
        rosterList.forEach(roster => {
            if (id <= roster.id) {
                id = roster.id +1
            }
        })
        addRoster(id, name)
        setRosterList(prev => [...prev, { id, name, createdAt: new Date() }])
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
                <AddRoster createRoster={createRoster} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <ul className="flex flex-col text-sm">
                {rosterList.map(roster => (
                    <li key={`${roster.id}-${roster.name}`} className="not-last:border-b p-1.5 flex items-center justify-between">
                        <span>{roster.name}</span>
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