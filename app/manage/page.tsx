import Models from "@/components/teams/model/models";
import Positions from "@/components/teams/position/positions";
import Teams from "@/components/teams/team/teams";
import TeamModels from "@/components/teams/teamModels/teamModels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getModels } from "@/server/models";
import { getPositions } from "@/server/positions";
import { getData as getTeamModels } from "@/server/teamModels";
import { getTeams } from "@/server/teams";

export default async function Manage() {
    const teams = await getTeams()
    const positions = await getPositions()
    const models = await getModels()
    const teamModels = await getTeamModels()
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
                {/* Model Types */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Model Types
                        </CardTitle>
                        <CardDescription>
                            Add or delete models.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Models models={models} positions={positions} />
                    </CardContent>
                </Card>
                {/* Team Models */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Team Model Numbers
                        </CardTitle>
                        <CardDescription>
                            Specify which models and how many that are allowed in a team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TeamModels teams={teams} positions={positions} teamModels={teamModels} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}