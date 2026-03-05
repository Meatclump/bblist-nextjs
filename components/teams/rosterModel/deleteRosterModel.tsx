"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deleteRosterModel: (value: number) => void
    itemId: number
}

const DeleteRosterModel: FC<Props> = ({ deleteRosterModel, itemId }) => {

    const handleDelete = async () => {
        deleteRosterModel(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeleteRosterModel