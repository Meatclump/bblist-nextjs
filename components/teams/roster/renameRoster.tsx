"use client"

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface Props {
    renameRoster: (id: number, value: string) => void
    itemId: number
}

const RenameRoster: FC<Props> = ({ renameRoster, itemId }) => {
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleChange()
    }

    const handleChange = async () => {
        renameRoster(itemId, input)
        setInput("")
    }

    return (
        <div className="px-2 items-center flex gap-2">
            <Input
                name={`change-${itemId}`}
                onChange={handleInput}
                onKeyUp={handleInputKeyUp}
            />
            <Button onClick={handleChange}>
                Update Name
            </Button>
        </div>
    )
}

export default RenameRoster