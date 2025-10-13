"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { loginFormSchema } from "../instructorSchemas"
import { fetchInstructorService, loginInstructorService } from "../instructorServices"
import { Instructor } from "../instructorTypes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authLiterals } from "@/lib/constants/common"
import { profile_completion } from "@/lib/constants/instructorConstants"
import { standardErrors } from "@/lib/constants/errors"
import { page } from "@/lib/constants/RouteConstants"
import { useState } from "react"
import Loader from "@/app/components/atoms/Loader"


const InstructorLoginForm = () => {
    const router = useRouter()
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

            const fetchInstructorResp = await fetchInstructorService()
            if (!fetchInstructorResp?.status) 
                return toast.error(fetchInstructorResp?.msg || "Something went wrong! Unable to fetch user after login.")
            const instructorData: Instructor = fetchInstructorResp?.response
            if (!instructorData) return toast.error(fetchInstructorResp?.msg || "Something went wrong! Unable to fetch user after login.")
            if (instructorData.profile_completion_status === profile_completion.PENDING) router.replace(page.SET_PROFILE)
            else router.replace(page.DASHBOARD_HOME)
            setIsLoading(false)
        } catch (err: any) {
            setIsLoading(false)
            if (err?.message && err?.message === standardErrors.TOKEN_EXPIRED)
                return toast.error(err.message)
            toast.error(err?.response?.data?.msg || standardErrors.UNKNOWN)
        }
    }

  return (
    <>
    {
        (isLoading) ? <Loader /> :
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
    }
    </>
  )
}

export default InstructorLoginForm