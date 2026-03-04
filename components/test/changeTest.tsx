import { ChangeEvent, FC, useState } from "react";

interface Props {
    changeTest: (id: number, value: string) => void
    itemId: number
}

const ChangeTest: FC<Props> = ({ changeTest, itemId }) => {
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleChange = async () => {
        changeTest(itemId, input)
    }

    return (
        <div className="border px-2 py-1 flex gap-1 bg-slate-300 rounded border-slate-400">
            <label htmlFor={`change-${itemId}`}>Change Text To:</label>
            <input
                className="border bg-slate-100 border-slate-400 px-2 rounded"
                name={`change-${itemId}`}
                type="text"
                onChange={handleInput}
            />
            <button
                onClick={handleChange}
                className="bg-amber-500/50 px-2 rounded border border-amber-500"
            >
                Change
            </button>
        </div>
    )
}

export default ChangeTest