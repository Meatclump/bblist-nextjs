"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deleteRoster: (value: number) => void
    itemId: number
}

const DeleteRoster: FC<Props> = ({ deleteRoster, itemId }) => {

    const handleDelete = async () => {
        deleteRoster(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeleteRoster