"use client"

import { FC } from "react"

interface Props {
    deleteTest: (value: number) => void
    itemId: number
}

const DeleteTest: FC<Props> = ({ deleteTest, itemId }) => {

    const handleDelete = async () => {
        deleteTest(itemId)
    }

    return (
        <button onClick={handleDelete} className="bg-red-600/40 rounded px-2 border border-red-600/50">
            Delete
        </button>
    )
}

export default DeleteTest