"use client"

import { position } from "@/app/types/position"
import { addPosition, deletePosition, editPosition } from "@/server/positions"
import AddPosition from "./addPosition"
import { FC, useState } from "react"
import DeletePosition from "./deletePosition"
import RenamePosition from "./renamePosition"

interface Props {
    positions: position[]
}

const Positions: FC<Props> = ({ positions }) => {
    const [positionList, setPositionList] = useState<position[]>(positions)

    const createPosition = (name: string) => {
        let id = (positionList.at(-1)?.id || 0) + 1
        positionList.forEach(position => {
            if (id <= position.id) {
                id = position.id +1
            }
        })
        addPosition(id, name)
        setPositionList(prev => [...prev, { id: id, name }])
    }

    const renamePosition = (id: number, name: string) => {
        setPositionList(prev => prev.map(position => position.id === id ? { ...position, name } : position))
        editPosition(id, name)
    }

    const deletePositionItem = (id: number) => {
        setPositionList(prev => prev.filter(position => position.id !== id))
        deletePosition(id)
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