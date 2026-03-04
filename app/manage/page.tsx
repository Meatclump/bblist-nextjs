import Positions from "@/components/teams/position/positions";
import Teams from "@/components/teams/team/teams";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPositions } from "@/server/positions";
import { getTeams } from "@/server/teams";

export default async function Manage() {
    const teams = await getTeams()
    const positions = await getPositions()
    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">Manage</h1>
                {/* Team Types */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Team Types
                        </CardTitle>
                        <CardDescription>
                            Add, modify or delete available teams.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Teams teams={teams} />
                    </CardContent>
                </Card>
                {/* Position Types */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Position Types
                        </CardTitle>
                        <CardDescription>
                            Add, modify or delete positions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Positions positions={positions} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}