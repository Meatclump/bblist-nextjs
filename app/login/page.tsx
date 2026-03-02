import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaTurnUp } from "react-icons/fa6"

const LoginPage = async () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Button variant={"link"} className="text-muted-foreground absolute top-0 left-0" asChild>
        <Link href={"/"}>
          <FaTurnUp className="rotate-270" />
          Go Back Home
        </Link>
      </Button>
      <div className="flex w-full max-w-sm flex-col gap-6">
          <h1 className="font-roboto-slab font-xl text-center font-extrabold text-red-700 text-2xl">BBList</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage