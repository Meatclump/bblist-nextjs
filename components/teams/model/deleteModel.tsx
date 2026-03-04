"use client"

import { FC } from "react"
import { Button } from "../../ui/button"

interface Props {
    deleteModel: (value: number) => void
    itemId: number
}

const DeleteModel: FC<Props> = ({ deleteModel, itemId }) => {

    const handleDelete = async () => {
        deleteModel(itemId)
    }

    return (
        <Button onClick={handleDelete} variant={"destructive"}>
            Delete
        </Button>
    )
}

export default DeleteModel