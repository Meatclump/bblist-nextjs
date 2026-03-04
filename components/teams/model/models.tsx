"use client"

import { model } from "@/app/types/model"
import { addModel, deleteModel, editModel } from "@/server/models"
import AddModel from "./addModel"
import { FC, useState } from "react"
import DeleteModel from "./deleteModel"
import EditModel from "./editModel"
import { position } from "@/app/types/position"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Props {
    models: model[]
    positions: position[]
}

const Models: FC<Props> = ({ models, positions }) => {
    const [modelList, setModelList] = useState<model[]>(models)

    const createModel = async (name: string, positionId: number, ma: number, st: number, ag: number, pa: number, av: number, cost: number) => {
        let id = (modelList.at(-1)?.id || 0) + 1
        modelList.forEach(model => {
            if (id <= model.id) {
                id = model.id +1
            }
        })
        const res = await addModel(id, name, positionId, ma, st, ag, pa, av, cost)
        if (res.success) {
            setModelList(prev => [...prev, { id, name, positionId, ma, st, ag, pa, av, cost }])
            toast.success(`Successfully added model ${name}` as string)
        } else {
            toast.error("Unable to add model" as string)
        }
    }

    const editModel = (id: number, name: string) => {
        setModelList(prev => prev.map(model => model.id === id ? { ...model, name } : model))
        // editModel(id, name)
    }

    const deleteModelItem = (id: number) => {
        setModelList(prev => prev.filter(model => model.id !== id))
        deleteModel(id)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddModel createModel={createModel} positions={positions} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">Name</TableHead>
                        <TableHead className="text-start">Position</TableHead>
                        <TableHead className="text-start">MA</TableHead>
                        <TableHead className="text-start">ST</TableHead>
                        <TableHead className="text-start">AG</TableHead>
                        <TableHead className="text-start">PA</TableHead>
                        <TableHead className="text-start">AV</TableHead>
                        <TableHead className="text-start">Cost</TableHead>
                        <TableHead className="text-start">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {modelList.map(model => (
                    <TableRow key={`${model.id}-${model.name}`}>
                        <TableCell className="text-start">{model.name}</TableCell>
                        <TableCell className="text-start">{positions.find(pos => pos.id === model.positionId)?.name}</TableCell>
                        <TableCell className="text-start">{model.ma}</TableCell>
                        <TableCell className="text-start">{model.st}</TableCell>
                        <TableCell className="text-start">{model.ag}</TableCell>
                        <TableCell className="text-start">{model.pa}</TableCell>
                        <TableCell className="text-start">{model.av}</TableCell>
                        <TableCell className="text-start">{model.cost}</TableCell>
                        <TableCell className="text-start">
                            <DeleteModel deleteModel={deleteModelItem} itemId={model.id} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Models