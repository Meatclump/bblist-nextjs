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
import { team } from "@/app/types/team"
import { generateIdFromList } from "@/lib/utils"

interface Props {
    models: model[]
    positions: position[]
    teams: team[]
}

const Models: FC<Props> = ({ models, positions, teams }) => {
    const [modelList, setModelList] = useState<model[]>(models)

    const createModel = async (
        name: string,
        positionId: number,
        ma: number,
        st: number,
        ag: number,
        pa: number,
        av: number,
        cost: number,
        teamId: number,
        maxNum: number,
        minNum: number
    ) => {
        let id = generateIdFromList(modelList)
        const res = await addModel(id, name, positionId, ma, st, ag, pa, av, cost, teamId, maxNum, minNum)
        if (res.success) {
            setModelList(prev => [...prev, { id, name, positionId, ma, st, ag, pa, av, cost, teamId, maxNum, minNum }])
            toast.success(`Successfully added model ${name}` as string)
        } else {
            toast.error("Unable to add model" as string)
        }
    }

    // Unsure if we will bother with editing a model, as opposed to just deleting and recreating it.
    // const editModel = (id: number, name: string) => {
    //     setModelList(prev => prev.map(model => model.id === id ? { ...model, name } : model))
    //     // editModel(id, name)
    // }

    const deleteModelItem = async (id: number) => {
        const modelName = modelList.find(m => m.id === id)?.name
        const res = await deleteModel(id)
        if (res.success) {
            setModelList(prev => prev.filter(model => model.id !== id))
            toast.success(`Successfully deleted model "${modelName}"`)
        } else {
            toast.error(`Unable to delete model "${modelName}"`)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add</h3>
                <AddModel createModel={createModel} positions={positions} teams={teams} />
            </div>
            <h3 className="font-semibold text-sm">List</h3>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">Name</TableHead>
                        <TableHead className="text-start">Position</TableHead>
                        <TableHead className="text-start">Team</TableHead>
                        <TableHead className="text-start">MA</TableHead>
                        <TableHead className="text-start">ST</TableHead>
                        <TableHead className="text-start">AG</TableHead>
                        <TableHead className="text-start">PA</TableHead>
                        <TableHead className="text-start">AV</TableHead>
                        <TableHead className="text-start">Cost</TableHead>
                        <TableHead className="text-start">Min</TableHead>
                        <TableHead className="text-start">Max</TableHead>
                        <TableHead className="text-start">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {modelList.map(model => (
                    <TableRow key={`${model.id}-${model.name}`}>
                        <TableCell className="text-start">{model.name}</TableCell>
                        <TableCell className="text-start">{positions.find(pos => pos.id === model.positionId)?.name}</TableCell>
                        <TableCell className="text-start">{teams.find(t => t.id === model.teamId)?.name}</TableCell>
                        <TableCell className="text-start">{model.ma}</TableCell>
                        <TableCell className="text-start">{model.st}</TableCell>
                        <TableCell className="text-start">{model.ag}</TableCell>
                        <TableCell className="text-start">{model.pa}</TableCell>
                        <TableCell className="text-start">{model.av}</TableCell>
                        <TableCell className="text-start">{model.cost}</TableCell>
                        <TableCell className="text-start">{model.minNum}</TableCell>
                        <TableCell className="text-start">{model.maxNum}</TableCell>
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