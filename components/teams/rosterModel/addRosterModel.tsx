"use client";

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { teamModels } from "@/app/types/teamModels";
import { model } from "@/app/types/model";
import { Input } from "@/components/ui/input";

interface Props {
    rosterId: number
    createRosterModel: (rosterId: number, modelId: number, playerNumber: number) => void
    models: model[]
}

const AddRosterModel: FC<Props> = ({ rosterId, createRosterModel, models }) => {
    const [selectedModelId, setSelectedModelId] = useState(0)
    const [playerNumber, setPlayerNumber] = useState(0)

    // const models

    const handleAdd = () => {
        createRosterModel(rosterId, selectedModelId, playerNumber)
    }

    const handlePlayerNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPlayerNumber(Number(e.target.value) ?? 0)
    }

    const handlePositionSelect = (value: string) => {
        setSelectedModelId(models.find(m => m.name === value)?.id ?? 0)
    }

    return (
        <div className="w-full flex gap-1 mt-2">
            <div className="flex flex-col gap-1">
                <Label>Player Number</Label>
                <Input
                    value={playerNumber}
                    onChange={handlePlayerNumberInput}
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label>Add Model</Label>
                <Select
                    name="modelId"
                    value={models.find(m => m.id === selectedModelId)?.name ?? ""}
                    onValueChange={handlePositionSelect}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        {models.map(model => (
                            <SelectItem key={model.id} value={model.name}>{model.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1 justify-end">
                <Button onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default AddRosterModel