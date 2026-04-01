"use client"

import { position } from "@/app/types/position"
import { addPosition, deletePosition, editPosition } from "@/server/positions"
import AddPosition from "./addPosition"
import { FC, useState } from "react"
import DeletePosition from "./deletePosition"
import RenamePosition from "./renamePosition"
import { generateIdFromList } from "@/lib/utils"
import { toast } from "sonner"

interface Props {
    positions: position[]
}

const Positions: FC<Props> = ({ positions }) => {
    const [positionList, setPositionList] = useState<position[]>(positions)

    const createPosition = async (name: string) => {
        let id = generateIdFromList(positionList)
        const res = await addPosition(id, name)
        if (res.success) {
            setPositionList(prev => [...prev, { id: id, name }])
            toast.success(`Successfully added position "${name}"`)
        } else {
            toast.error(`Unable to add position "${name}"`)
        }
    }

    const renamePosition = async (id: number, name: string) => {
        const oldName = positionList.find(t => t.id === id)?.name
        const res = await editPosition(id, name)
        if (res.success) {
            setPositionList(prev => prev.map(position => position.id === id ? { ...position, name } : position))
            toast.success(`Successfully updated position "${oldName}" to "${name}"`)
        } else {
            toast.error(`Unable to update position "${oldName}" to "${name}"`)
        }
    }

    const deletePositionItem = async (id: number) => {
        const positionName = positionList.find(t => t.id === id)?.name
        const res = await deletePosition(id)
        if (res.success) {
            setPositionList(prev => prev.filter(position => position.id !== id))
            toast.success(`Successfully deleted position "${positionName}"`)
        } else {
            toast.error(`Unable to update position "${positionName}"`)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddPosition createPosition={createPosition} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <ul className="flex flex-col text-sm">
                {positionList.map(position => (
                    <li key={`${position.id}-${position.name}`} className="not-last:border-b p-1.5 flex items-center justify-between">
                        <span>{position.name}</span>
                        <div className="flex gap-1">
                            <RenamePosition renamePosition={renamePosition} itemId={position.id} />
                            <DeletePosition deletePosition={deletePositionItem} itemId={position.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Positions