"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUp } from "@/server/users"
import { z } from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./ui/spinner"

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string().min(8, "Password must be at least 8 characters"),
})
.refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { success, message } = await signUp(values.username, values.email, values.password)

    if (success) {
      toast.success(message as string)
      router.push("/dashboard")
    } else {
      toast.error(message as string, { className: "!bg-destructive/30" })
    }
    setIsLoading(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FieldGroup>
                <Field>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="JohnDoe" {...field} />
                        </FormControl>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="******" {...field} type="password" />
                            </FormControl>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="******" {...field} type="password" />
                            </FormControl>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </FormItem>
                        )}
                      />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Spinner />}
                    Create Account
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account? <Link href="/login">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
