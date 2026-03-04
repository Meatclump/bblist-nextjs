"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deletePosition: (value: number) => void
    itemId: number
}

const DeletePosition: FC<Props> = ({ deletePosition, itemId }) => {

    const handleDelete = async () => {
        deletePosition(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeletePosition