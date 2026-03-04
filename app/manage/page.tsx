import { Logout } from "@/components/ui/logout";
import { getData } from "@/server/tests";
import { testType } from "../types/testType";
import Tests from "@/components/test/tests";
import getUser from "@/lib/user";

export default async function Dashboard() {
    const user = await getUser()
    const data = await getData()
    
    return (
        <main className="flex flex-col gap-3 p-3">
            <h1>Manage</h1>
            {user && 
                <p>
                    Welcome back, {user.name} (role: {user.role})
                </p>
            }
            <div>
                <Logout />
            </div>
            <div className="max-w-150">
                <Tests tests={data as testType[]} />
            </div>
        </main>
    )
}