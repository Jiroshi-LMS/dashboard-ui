"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { loginFormSchema } from "../instructorSchemas"
import { loginInstructorService } from "../instructorServices"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authLiterals } from "@/lib/constants/common"
import { standardErrors } from "@/lib/constants/errors"
import { page } from "@/lib/constants/RouteConstants"
import { useState } from "react"
import Loader from "@/app/components/atoms/Loader"
import { useAppDispatch } from "@/hooks/useRedux"
import { fetchInstructor } from "../instructorSlice"


const InstructorLoginForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
        email: "",
        password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        try {
            setIsLoading(true)
            const loginResp = await loginInstructorService(values)
            if (!loginResp?.status || !loginResp?.response['access_token'])
                return toast.error(loginResp?.msg || "Something went wrong! We were unable to log you in.");
            localStorage.setItem(authLiterals.ACCESS, loginResp?.response['access_token'])
            setTimeout(() => {
                dispatch(fetchInstructor(true))
                router.replace(page.DASHBOARD_HOME)
                setIsLoading(false)
            }, 500)
        } catch (err: any) {
            setIsLoading(false)
            if (err?.message && err?.message === standardErrors.TOKEN_EXPIRED)
                return toast.error(err.message)
            toast.error(err?.response?.data?.msg || standardErrors.UNKNOWN)
        }
    }

    if (isLoading) return <Loader />

  return (
    <>
    <div className="w-full max-w-md space-y-8 pt-[2rem]">
    <h1 className="text-3xl font-semibold text-center">Sign In</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Password */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer text-white">
                Sign In
            </Button>
            <p className="text-sm text-gray-500">Don't have an account? <Link href="/auth/signup" className="text-primary">Register</Link></p>
            </form>
        </Form>
    </div>
    </>
  )
}

export default InstructorLoginForm