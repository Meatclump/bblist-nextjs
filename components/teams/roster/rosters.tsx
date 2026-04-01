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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface Props {
    rosters: roster[]
    teams: team[]
}

const Rosters: FC<Props> = ({ rosters, teams }) => {
    const [rosterList, setRosterList] = useState<roster[]>(rosters)

    const createRoster = async (name: string, teamId: number) => {
        const res = await addRoster(name, teamId)
        if (res && res.success) {
            if (res.id) {
                toast.success(`Successfully added new roster "${name}"`)
                setRosterList(prev => [...prev, { id: res.id ?? 0, name, createdAt: new Date(), userId: "", teamId }])
            } else {
                toast.error(`Unable to add roster "${name}" - Could not generate roster ID`)
            }
        } else {
            toast.error(`Unable to add roster "${name}"`)
        }
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Roster Name</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {rosterList.map(roster => (
                    <TableRow key={`${roster.id}-${roster.name}`}>
                        <TableCell>
                            <Button variant={"default"}>
                                <Link href={`/roster/${roster.id}`}>{roster.name}</Link>
                            </Button>
                        </TableCell>
                        <TableCell>
                            {teams.find(t => t.id === roster.teamId)?.name}
                        </TableCell>
                        <TableCell>
                            <RenameRoster renameRoster={renameRoster} itemId={roster.id} />
                        </TableCell>
                        <TableCell>
                            <DeleteRoster deleteRoster={deleteRosterItem} itemId={roster.id} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Rosters