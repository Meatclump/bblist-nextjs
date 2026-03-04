import { getData } from "@/server/tests";
import { testType } from "../types/testType";
import Tests from "@/components/test/tests";

export default async function Dashboard() {
    const data = await getData()

    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">Dashboard</h1>
                <h2 className="text-2xl">Test section</h2>
                <Tests tests={data as testType[]} />
            </main>
        </div>
    )
}