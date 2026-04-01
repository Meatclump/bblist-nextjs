"use client"

import { rosterModel } from "@/app/types/rosterModel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addRosterModel, deleteRosterModel } from "@/server/rosterModels"
import { FC, useState } from "react"
import AddRosterModel from "./addRosterModel"
import { model } from "@/app/types/model"
import DeleteRosterModel from "./deleteRosterModel"
import { position } from "@/app/types/position"
import { toast } from "sonner"
import { toUSD } from "@/lib/utils"

interface Props {
    rosterId: number
    rosterModels: rosterModel[]
    models: model[]
    positions: position[]
}

const RosterModels: FC<Props> = ({ rosterId, rosterModels, models, positions }) => {
    const [rosterModelList, setRosterModelList] = useState(rosterModels)
    const initialValue = 0
    const totalCost = rosterModelList.reduce((acc, curr) => acc + (models.find(m => m.id === curr.modelId)?.cost ?? 0), initialValue)

    const createRosterModel = async (rosterId: number, modelId: number, playerNumber: number) => {
        const model = models.find(m => m.id === modelId)
        const res = await addRosterModel(rosterId, modelId, playerNumber)
        if (res && res.success) {
            if (res.id) {
                setRosterModelList(prev => [...prev, { id: res.id, rosterId, modelId, playerNumber }])
                toast.success(`Successfully added model "${model?.name}" to roster.`)
            } else {
                toast.error(`Unable to add model "${model?.name}" to roster - Could not generate roster model ID`)
            }
        } else {
            toast.error(`Unable to add model "${model?.name}" to roster.`)
        }
    }

    const deleteRosterModelItem = async (id: number) => {
        const rosterModel = rosterModelList.find(rm => rm.id === id)
        const model = models.find(m => m.id === rosterModel?.modelId)
        const res = await deleteRosterModel(id)
        if (res.success) {
            toast.success(`Successfully deleted model "${model?.name}" from roster.`)
        } else {
            toast.error(`Unable to delete model "${model?.name}" from roster.`)
        }
        setRosterModelList(prev => {
            let newList = [...prev].filter(p => p.id !== id)
            return newList
        })
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Add Models to Roster</h3>
                <AddRosterModel createRosterModel={createRosterModel} models={models} rosterId={rosterId} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Player#</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>MA</TableHead>
                            <TableHead>ST</TableHead>
                            <TableHead>AG</TableHead>
                            <TableHead>PA</TableHead>
                            <TableHead>AV</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rosterModelList.map(rosterModel =>
                            <TableRow key={rosterModel.id}>
                                <TableCell>{rosterModel.playerNumber}</TableCell>
                                <TableCell>{positions.find(pos => pos.id === models.find(m => m.id === rosterModel.modelId)?.positionId)?.name}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.name}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.ma}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.st}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.ag}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.pa}</TableCell>
                                <TableCell>{models.find(m => m.id === rosterModel.modelId)?.av}</TableCell>
                                <TableCell>{toUSD(models.find(m => m.id === rosterModel.modelId)?.cost ?? 0)}</TableCell>
                                <TableCell><DeleteRosterModel deleteRosterModel={deleteRosterModelItem} itemId={rosterModel.id} /></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <h3>Total Cost: {toUSD(totalCost)}</h3>
            </div>
        </div>
    )
}

export default RosterModels