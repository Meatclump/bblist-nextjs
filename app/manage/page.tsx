import Teams from "@/components/team/teams";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeams } from "@/server/teams";

export default async function Manage() {
    const teams = await getTeams()
    return (
        <div className="flex w-full justify-center">
            <main className="flex flex-col gap-3 p-3 w-full max-w-6xl">
                <h1 className="text-4xl">Manage</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Teams
                        </CardTitle>
                        <CardDescription>
                            Add, modify or delete available teams.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Teams teams={teams} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}