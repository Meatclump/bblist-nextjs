import Nav from "@/components/navbar/nav"
import { auth } from "@/lib/auth"
import getUser from "@/lib/user"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/login")
    }

    return (
        <>
            <Nav />
            {children}
        </>
    )
}