"use client";

import { ChangeEvent, FC, useState } from "react";
import { Button } from "../../ui/button";

interface Props {
    createRoster: (value: string) => void
}

const AddRoster: FC<Props> = ({ createRoster }) => {
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAdd()
    }

    const handleAdd = async () => {
        createRoster(input)
        setInput("")
    }

    return (
        <div className="w-full flex gap-1 mt-2">
            <input
                type="text"
                className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
                onChange={handleInput}
                onKeyUp={handleInputKeyUp}
                value={input}
                placeholder="Enter roster name..."
            />
            <Button onClick={handleAdd}>
                Add
            </Button>
        </div>
    )
}

export default AddRoster