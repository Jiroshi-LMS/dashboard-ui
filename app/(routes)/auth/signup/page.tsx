"use client"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import api from "@/lib/api/axios"
import { page, route } from "@/lib/constants/apiRoutes"
import { countryCodes } from "@/lib/constants/common"
import { standardErrors } from "@/lib/constants/errors"
import { profile_completion } from "@/lib/constants/instructorConstants"
import { instructorRegistrationSchema } from "@/lib/schemas/instructorSchemas"
import { zodResolver } from "@hookform/resolvers/zod"



const RegisterPage = () => {
  const router = useRouter()

  const try_and_fetch_user = async () => {
    try {
      const resp = await api.get(route.ME)
      const data: StandardResponse = resp.data
      if (data.status) {
        if (data.response['profile_completion_status'] == profile_completion.PENDING) {
          router.replace(page.SET_PROFILE)
        } else {
          router.replace(page.DASHBOARD_HOME)
        }
      }
    } catch(err: any) {
      return;
    }
  }

  useEffect(() => {
    try_and_fetch_user()
  }, [])

  const form = useForm<z.infer<typeof instructorRegistrationSchema>>({
    resolver: zodResolver(instructorRegistrationSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof instructorRegistrationSchema>) => {
    const submissionPayload :InstructorSignupSubmissionPayload = {
      full_name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password,
    }
    if (values.phoneNumber || values.phoneNumber?.length == 10) {
      submissionPayload['country_code'] = countryCodes.IND
      submissionPayload['phone_number'] = values.phoneNumber
    }

    try {
      const resp = await api.post(route.INSTRUCTOR, submissionPayload)
      const data: StandardResponse = resp.data
      if (data.status) {
        localStorage.setItem('access', data.response['access_token'])
        router.replace(page.SET_PROFILE)
      }
    }
    catch (err: any) {
      const errData: StandardResponse | undefined | null = err?.response?.data
      if (errData){
        toast.error(errData.msg)
      } else {
        toast.error(standardErrors.UNKNOWN)
      }
    }

  }

  return (
    <>
      <Head>
        <title>Register | Jiroshi</title>
        <meta name="description" content="Register" />
      </Head>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">What is Jiroshi?</h2>
          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum exercitationem earum sequi
            dicta atque deleniti, aliquid nesciunt suscipit consectetur fuga beatae magnam!
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-3xl font-semibold text-center">Register as an Instructor</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jiroshi Instructor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="jiroshi.instructor" {...field} />
                      </FormControl>
                      <FormDescription>This will be your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/* Phone */}
                <div className="flex gap-2">
                  {/* Country Code (Locked) */}
                  <div className="w-20">
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input value="+91" disabled className="bg-gray-100 text-gray-600" />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer text-white">
                  Register
                </Button>
                <p className="text-sm text-gray-500">Already have an account? <Link href="/auth/login" className="text-primary">Sign In</Link></p>
              </form>
            </Form>
          </div>
        </section>
      </main>
    </>
  )
}

export default RegisterPage
