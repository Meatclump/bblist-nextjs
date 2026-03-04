"use client";

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../../ui/button";
import { position } from "@/app/types/position";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { model } from "@/app/types/model";
import { Label } from "@/components/ui/label";

interface Props {
    createModel: (name: string, positionId: number, ma: number, st: number, ag: number, pa: number, av: number, cost: number) => void
    positions: position[]
}

const AddModel: FC<Props> = ({ createModel, positions }) => {
    const initialModel = { id: 0, name: "", positionId: 0, ma: 0, st: 0, ag: 0, pa: 0, av: 0, cost: 0 } as model
    const [model, setModel] = useState(initialModel as model)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setModel(prev => ({ ...prev, [e.target.name]: e.target.value } as model))
    }
    const handleNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
        setModel(prev => ({ ...prev, [e.target.name]: Number(e.target.value) } as model))
    }
    const handleSelect = (value: string) => {
        setModel(prev => ({
            ...prev,
            positionId: positions.find(p => p.name === value)?.id || 0
        } as model))
    }
    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAdd()
    }

    const handleAdd = async () => {
        createModel(model.name, model.positionId, model.ma, model.st, model.ag, model.pa, model.av, model.cost)
        setModel(initialModel as model)
    }
    console.log(model)

    return (
        <div className="w-full flex gap-1 mt-2">
            <div className="flex flex-col gap-1 w-full">
                <Label htmlFor={"modelName"}>Name</Label>
                <Input
                    id="modelName"
                    type="text"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleInput}
                    onKeyUp={handleInputKeyUp}
                    name="name"
                    value={model?.name || ""}
                    placeholder="Name..."
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"maInput"}>MA</Label>
                <Input
                    id="maInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="ma"
                    value={model?.ma || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"stInput"}>ST</Label>
                <Input
                    id="stInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="st"
                    value={model?.st || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"agInput"}>AG</Label>
                <Input
                    id="agInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="ag"
                    value={model?.ag || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"paInput"}>PA</Label>
                <Input
                    id="paInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="pa"
                    value={model?.pa || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"avInput"}>AV</Label>
                <Input
                    id="avInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="av"
                    value={model?.av || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={"costInput"}>Cost</Label>
                <Input
                    id="costInput"
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                    onChange={handleNumberInput}
                    onKeyUp={handleInputKeyUp}
                    name="cost"
                    value={model?.cost || ""}
                    placeholder="0"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label>Position</Label>
                <Select
                    name="positionId"
                    value={positions.find(p => p.id === model?.positionId)?.name || ""}
                    onValueChange={handleSelect}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a position type" />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map(position => (
                            <SelectItem key={position.id} value={position.name}>{position.name}</SelectItem>
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

export default AddModel