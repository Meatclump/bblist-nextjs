import Rosters from "@/components/teams/roster/rosters";
import { getRosters } from "@/server/rosters";

export default async function Dashboard() {
    const data = await getRosters()

    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">Dashboard</h1>
                <h2 className="text-2xl">Rosters</h2>
                <Rosters rosters={data} />
            </main>
        </div>
    )
}