"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRedirectForLoggedIn } from "@/feature/instructor/instructorHooks"
import { loginFormSchema } from "@/feature/instructor/instructorSchemas"
import { fetchInstructorService, loginInstructorService } from "@/feature/instructor/instructorServices"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Instructor } from "@/feature/instructor/instructorTypes"
import { profile_completion } from "@/lib/constants/instructorConstants"
import { page } from "@/lib/constants/RouteConstants"
import { standardErrors } from "@/lib/constants/errors"



const LoginPage = () => {
  const router = useRouter()
  useRedirectForLoggedIn()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const loginResp = await loginInstructorService(values)
      if (!loginResp?.status || !loginResp?.response['access_token'])
        return toast.error(loginResp?.msg || "Something went wrong! We were unable to log you in.");
      localStorage.setItem('access', loginResp?.response['access_token'])

      const fetchInstructorResp = await fetchInstructorService()
      if (!fetchInstructorResp?.status) 
        return toast.error(fetchInstructorResp?.msg || "Something went wrong! Unable to fetch user after login.")
      const instructorData: Instructor = fetchInstructorResp?.response
      if (!instructorData) return toast.error(fetchInstructorResp?.msg || "Something went wrong! Unable to fetch user after login.")
      if (instructorData.profile_completion_status === profile_completion.PENDING) router.replace(page.SET_PROFILE)
      else router.replace(page.DASHBOARD_HOME)

    } catch (err: any) {
      if (err?.message && err?.message === 'TOKEN_EXPIRED')
        return toast.error(err.message)
      toast.error(err?.response?.data?.msg || standardErrors.UNKNOWN)
    }
  }

  return (
    <>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">Have any questions or suggestions?</h2>
          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum exercitationem earum sequi
            dicta atque deleniti, aliquid nesciunt suscipit consectetur fuga beatae magnam!
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
          <div className="w-full max-w-md space-y-8 pt-[9rem]">
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
        </section>
      </main>
    </>
  )
}

export default LoginPage
