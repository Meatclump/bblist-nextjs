import { auth } from "@/lib/auth"
import getUser from "@/lib/user"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser()

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/dashboard")
    }

    if (session.user.role !== "admin") {
        redirect("/dashboard")
    }

    return <>{children}</>
}