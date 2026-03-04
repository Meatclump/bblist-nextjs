import { Logout } from "@/components/ui/logout";
import { getData } from "@/server/tests";
import { testType } from "../types/testType";
import Tests from "@/components/test/tests";

export default async function Dashboard() {
    const data = await getData()
    
    return (
        <main>
            <h1>Dashboard</h1>
            <Logout />
            <Tests tests={data as testType[]} />
        </main>
    )
}