import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-red-700 font-roboto-slab font-extrabold text-5xl">
            BBList
          </h1>
          <p className="text-muted-foreground">
            Plan and build your Blood Bowl roster with BBList!
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
