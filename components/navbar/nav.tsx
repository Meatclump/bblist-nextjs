import getUser from "@/lib/user"
import { Logout } from "../ui/logout"
import Link from "next/link"
import { Button } from "../ui/button"

const Nav = async () => {
    const user = await getUser()
    return (
        <div className="flex justify-between items-center px-3 py-2 border-b shadow-sm">
            <Link href={"/dashboard"}>BBList</Link>
            {user && (
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-1">
                        Signed in as
                        <span className="text-slate-700 capitalize">{user.name}</span>
                    </div>
                    {user.role === "admin" && (
                        <Button asChild variant={"outline"}>
                            <Link href={"/manage"}>Manage Teams</Link>
                        </Button>
                    )}
                    <Logout />
                </div>
            )}
        </div>
    )
}

export default Nav