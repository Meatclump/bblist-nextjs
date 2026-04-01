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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FaEllipsis } from "react-icons/fa6"
import { toastError, toastSuccess } from "@/lib/utils"

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
                toastSuccess(`Successfully added roster "${name}"`)
                setRosterList(prev => [...prev, { id: res.id ?? 0, name, createdAt: new Date(), userId: "", teamId }])
            } else {
                toastError(`Unable to add roster "${name}" - Could not generate roster ID`)
            }
        } else {
            toastError(`Unable to add roster "${name}"`)
        }
    }

    const renameRoster = async (id: number, name: string) => {
        const rosterName = rosterList.find(r => r.id === id)?.name
        const res = await editRoster(id, name)
        if (res.success) {
            setRosterList(prev => prev.map(team => team.id === id ? { ...team, name } : team))
            toastSuccess(`Successfully updated name of roster "${rosterName}" to "${name}"`)
        } else {
            toastError(`Unable to update name of roster "${rosterName}"`)
        }
    }

    const deleteRosterItem = async (id: number) => {
        const rosterName = rosterList.find(r => r.id === id)?.name
        const res = await deleteRoster(id)
        if (res.success) {
            setRosterList(prev => prev.filter(team => team.id !== id))
            toastSuccess(`Successfully deleted roster "${rosterName}"`)
        } else {
            toastError(`Unable to delete roster "${rosterName}"`)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Add Roster
                    </CardTitle>
                    <CardDescription>
                        Add new team rosters.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddRoster createRoster={createRoster} teams={teams} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Rosters</CardTitle>
                    <CardDescription>View or modify your created rosters.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold w-50">Team</TableHead>
                                <TableHead className="font-bold">Name</TableHead>
                                <TableHead className="font-bold text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rosterList.map(roster => (
                                <TableRow key={`${roster.id}-${roster.name}`}>
                                    <TableCell>
                                        {teams.find(t => t.id === roster.teamId)?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button asChild variant={"link"} className="px-0">
                                            <Link href={`/roster/${roster.id}`}>{roster.name}</Link>
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"}><FaEllipsis /></Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end">
                                                <div className="flex flex-col gap-3">
                                                    <h2>Rename Roster</h2>
                                                    <RenameRoster renameRoster={renameRoster} itemId={roster.id} />
                                                    <hr />
                                                    <DeleteRoster deleteRoster={deleteRosterItem} itemId={roster.id} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Rosters