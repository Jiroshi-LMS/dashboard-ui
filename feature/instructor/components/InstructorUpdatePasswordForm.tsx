"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dispatch, SetStateAction } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { instructorPasswordDetailsUpdateFormSchema } from "../instructorSchemas"
import { InstructorPasswordUpdateService } from "../instructorServices"
import { useAppDispatch } from "@/hooks/useRedux"
import { fetchInstructor } from "../instructorSlice"

type Props = {
  setIsUpdatingProfile: Dispatch<SetStateAction<boolean>>
}

export default function InstructorUpdatePasswordForm({ setIsUpdatingProfile }: Props) {
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof instructorPasswordDetailsUpdateFormSchema>>({
    resolver: zodResolver(instructorPasswordDetailsUpdateFormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      retype_new_password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof instructorPasswordDetailsUpdateFormSchema>) => {
    setIsUpdatingProfile(true)
    await InstructorPasswordUpdateService(values)
    dispatch(fetchInstructor(true))
    setIsUpdatingProfile(false)
  }

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm mt-6">
      <Card className="w-full border border-gray-200 shadow-sm rounded-2xl p-4 md:p-6 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Password Settings</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Update your account password. Make sure it’s something strong and secure.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="retype_new_password"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Retype New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
