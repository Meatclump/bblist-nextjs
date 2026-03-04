"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deleteTeam: (value: number) => void
    itemId: number
}

const DeleteTeam: FC<Props> = ({ deleteTeam, itemId }) => {

    const handleDelete = async () => {
        deleteTeam(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeleteTeam