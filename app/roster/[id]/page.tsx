import RosterModels from "@/components/teams/rosterModel/rosterModels";
import { Button } from "@/components/ui/button";
import getUser from "@/lib/user";
import { getModels } from "@/server/models";
import { getPositions } from "@/server/positions";
import { getRosterModels } from "@/server/rosterModels";
import { getRosters } from "@/server/rosters";
import { getData } from "@/server/teamModels";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft, FaBackward } from "react-icons/fa6";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const rosters = await getRosters()
    const user = await getUser()
    const currentRoster = rosters.find(r => r.id === Number(id))

    if (currentRoster?.userId !== user?.id) {
        redirect("/dashboard")
    }

    const rosterModels = await getRosterModels()
    const models = await getModels()
    const positions = await getPositions()

    const filteredRosterModels = rosterModels.filter(rm => rm.rosterId === currentRoster?.id)
    const filteredModels = models.filter(m => m.teamId === currentRoster?.teamId)

    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">{currentRoster?.name ?? ""}</h1>
                <div>
                    <Button>
                        <Link className="flex items-center gap-2" href={"/dashboard"}><FaArrowLeft /> Return to Dashboard</Link>
                    </Button>
                </div>
                <RosterModels
                    rosterId={currentRoster?.id ?? 0}
                    rosterModels={filteredRosterModels}
                    models={filteredModels}
                    positions={positions}
                />
            </main>
        </div>
    )
}