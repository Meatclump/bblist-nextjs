import Rosters from "@/components/teams/roster/rosters";
import getUser from "@/lib/user";
import { getRosters } from "@/server/rosters";
import { getTeams } from "@/server/teams";

export default async function Dashboard() {
    const rosters = await getRosters()
    const teams = await getTeams()
    const user = await getUser()

    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">Dashboard</h1>
                <h2 className="text-2xl">Rosters</h2>
                <Rosters rosters={rosters.filter(r => r.userId === user?.id)} teams={teams} />
            </main>
        </div>
    )
}