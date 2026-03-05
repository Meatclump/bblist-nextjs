"use client"

import { rosterModel } from "@/app/types/rosterModel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addRosterModel, deleteRosterModel } from "@/server/rosterModels"
import { FC, useState } from "react"
import AddRosterModel from "./addRosterModel"
import { model } from "@/app/types/model"
import DeleteRosterModel from "./deleteRosterModel"
import { position } from "@/app/types/position"

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

    const createRosterModel = (rosterId: number, modelId: number, playerNumber: number) => {
        let id = Math.floor(Math.random()*99999)
        // let id = (rosterModelList.at(-1)?.id || 0) + 1
        // rosterModelList.forEach(roster => {
        //     if (id <= roster.id) {
        //         id = roster.id + 1
        //     }
        // })
        addRosterModel(id, rosterId, modelId, playerNumber)
        setRosterModelList(prev => [...prev, { id, rosterId, modelId, playerNumber }])
    }

    const deleteRosterModelItem = (id: number) => {
        setRosterModelList(prev => {
            let newList = [...prev].filter(p => p.id !== id)
            return newList
        })
        deleteRosterModel(id)
    }

    const toUSD = (value: number) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger'}).format(value)
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