"use client"

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
    renameTeam: (id: number, value: string) => void
    itemId: number
}

const RenameTeam: FC<Props> = ({ renameTeam, itemId }) => {
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleChange()
    }

    const handleChange = async () => {
        renameTeam(itemId, input)
        setInput("")
    }

    return (
        <div className="px-2 items-center flex gap-2">
            <Label htmlFor={`change-${itemId}`} className="whitespace-nowrap">
                Change Name To:
            </Label>
            <Input
                name={`change-${itemId}`}
                onChange={handleInput}
                onKeyUp={handleInputKeyUp}
            />
            <Button onClick={handleChange}>
                Change
            </Button>
        </div>
    )
}

export default RenameTeam