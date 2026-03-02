"use client"

import { authClient } from "@/lib/client"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./spinner"

export function Logout() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleLogout = async () => {
        setIsLoading(true)
        await authClient.signOut()
        router.push("/login")
    }

    return (
        <Button variant={"outline"} onClick={handleLogout} disabled={isLoading}>
            {isLoading && <Spinner />}
            Logout
        </Button>
    )
}