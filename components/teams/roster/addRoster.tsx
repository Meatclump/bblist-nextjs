"use client";

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { team } from "@/app/types/team";
import { Input } from "@/components/ui/input";

interface Props {
    createRoster: (value: string, teamId: number) => void
    teams: team[]
}

const AddRoster: FC<Props> = ({ createRoster, teams }) => {
    const [input, setInput] = useState("")
    const [selectedTeam, setSelectedTeam] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAdd()
    }

    const handleAdd = async () => {
        createRoster(input, Number(selectedTeam))
        setInput("")
    }

    const handleTeamSelect = async (value: string) => {
        setSelectedTeam(teams.find(t => t.name === value)?.id.toString() ?? "")
    }

    return (
        <div className="w-full flex gap-1 mt-2">
            <div className="flex flex-col gap-1 flex-1">
                <Label>Roster Name</Label>
                <Input
                    type="text"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleInput}
                    onKeyUp={handleInputKeyUp}
                    value={input}
                    placeholder="Enter roster name..."
                />
            </div>
            <div className="flex flex-col gap-1 w-50">
                <Label>Team</Label>
                <Select
                    name="teamId"
                    value={teams.find(t => t.id.toString() === selectedTeam)?.name ?? ""}
                    onValueChange={handleTeamSelect}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                        {teams.map(team => (
                            <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col justify-end">
                <Button onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default AddRoster