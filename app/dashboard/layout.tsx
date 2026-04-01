import Nav from "@/components/navbar/nav"
import { auth } from "@/lib/auth"
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
        <div className="bg-stone-100 min-h-screen">
            <Nav />
            {children}
        </div>
    )
}