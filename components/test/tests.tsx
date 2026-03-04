"use client"

import { testType } from "@/app/types/testType"
import { addTest, deleteTest, editTest } from "@/server/tests"
import { FC, useState } from "react"
import AddTest from "./addTest"
import DeleteTest from "./deleteTest"
import ChangeTest from "./changeTest"

interface Props {
    tests: testType[]
}

const Tests: FC<Props> = ({ tests }) => {
    const [testItems, setTestItems] = useState<testType[]>(tests)

    const createTest = (text: string) => {
        const id = (testItems.at(-1)?.id || 0) + 1
        addTest(id, text)
        setTestItems(prev => [...prev, { id: id, text }])
    }

    const changeTestText = (id: number, text: string) => {
        setTestItems(prev => prev.map(test => test.id === id ? { ...test, text } : test))
        editTest(id, text)
    }

    const deleteTestItem = (id: number) => {
        setTestItems(prev => prev.filter(test => test.id !== id))
        deleteTest(id)
    }

    return (
        <div>
            <ul>
                {testItems.map(item => (
                    <li key={item.id} className="flex gap-1 border border-slate-900 rounded px-2 py-1 items-center">
                        <span>{item.text}</span>
                        <DeleteTest deleteTest={deleteTestItem} itemId={item.id} />
                        <ChangeTest changeTest={changeTestText} itemId={item.id} />
                    </li>
                ))}
            </ul>
            <AddTest createTest={createTest} />
        </div>
    )
}

export default Tests