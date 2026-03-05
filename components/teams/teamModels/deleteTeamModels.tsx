"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deleteTeamModels: (value: number) => void
    itemId: number
}

const DeleteTeamModels: FC<Props> = ({ deleteTeamModels, itemId }) => {

    const handleDelete = async () => {
        deleteTeamModels(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeleteTeamModels