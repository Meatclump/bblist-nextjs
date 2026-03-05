"use client";

import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { model } from "@/app/types/model";
import { Label } from "@/components/ui/label";
import { team } from "@/app/types/team";
import { teamModels } from "@/app/types/teamModels";
import { position } from "@/app/types/position";

interface Props {
    createTeamModels: (teamId: number, modelId: number, minModels: number, maxModels: number) => void
    teams: team[]
    positions: position[]
}

const AddTeamModels: FC<Props> = ({ createTeamModels, teams, positions }) => {
    const [selectedTeam, setSelectedTeam] = useState("")
    const [selectedPosition, setSelectedPosition] = useState("")
    const [minModels, setMinModels] = useState(0)
    const [maxModels, setMaxModels] = useState(0)

    const handleTeamSelect = (value: string) => setSelectedTeam(teams.find(t => t.name === value)?.id.toString() ?? "")
    const handlePositionSelect = (value: string) => setSelectedPosition(positions.find(p => p.name === value)?.id.toString() ?? "")
    const handleMinModelsInput = (e: ChangeEvent<HTMLInputElement>) => setMinModels(Number(e.target.value) ?? 0)
    const handleMaxModelsInput = (e: ChangeEvent<HTMLInputElement>) => setMaxModels(Number(e.target.value) ?? 0)

    const handleAdd = () => {
        createTeamModels(Number(selectedTeam), Number(selectedPosition), minModels, maxModels)
    }

    return (
        <div className="w-full flex gap-1 mt-2">
            <div className="flex flex-col gap-1">
                <Label>Teams</Label>
                <Select
                    name="teamId"
                    value={teams.find(t => t.id.toString() === selectedTeam)?.name ?? ""}
                    onValueChange={handleTeamSelect}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                        {teams.map(team => (
                            <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1">
                <Label>Positions</Label>
                <Select
                    name="positionId"
                    value={positions.find(p => p.id.toString() === selectedPosition)?.name ?? ""}
                    onValueChange={handlePositionSelect}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map(position => (
                            <SelectItem key={position.id} value={position.name}>{position.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"minModels"}>Min Models</Label>
                <Input
                    id="minModels"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleMinModelsInput}
                    name="st"
                    value={minModels}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"maxModels"}>Max Models</Label>
                <Input
                    id="maxModels"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleMaxModelsInput}
                    name="st"
                    value={maxModels}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1 justify-end">
                <Button onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default AddTeamModels