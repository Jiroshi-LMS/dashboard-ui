'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { Dispatch, SetStateAction } from 'react'
import { Instructor } from '../instructorTypes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { instructorAccountDetailsUpdateSchema } from '../instructorSchemas'
import { InstructorAccountDetailsUpdateService } from '../instructorServices'
import { useAppDispatch } from '@/hooks/useRedux'
import { fetchInstructor } from '../instructorSlice'

const InstructorUpdateAccountDetails = ({
  instructor,
  setIsUpdatingProfile,
}: {
  instructor: Instructor | null
  setIsUpdatingProfile: Dispatch<SetStateAction<boolean>>
}) => {

  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof instructorAccountDetailsUpdateSchema>>({
    resolver: zodResolver(instructorAccountDetailsUpdateSchema),
    defaultValues: {
      full_name: instructor?.full_name || '',
      username: instructor?.username || '',
      email: instructor?.email || '',
      phone_number: instructor?.phone_number || '',
      current_password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof instructorAccountDetailsUpdateSchema>) => {
    setIsUpdatingProfile(true)
    await InstructorAccountDetailsUpdateService(values)
    dispatch(fetchInstructor(true))
    setIsUpdatingProfile(false)
  }

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-8">Account Settings</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Row 1: Full name & Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value="+91"
                      disabled
                      className="w-20 text-center bg-gray-100 text-gray-500"
                    />
                    <FormControl>
                      <Input type="tel" placeholder="9876543210" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Current Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Save Button */}
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
    </section>
  )
}

export default InstructorUpdateAccountDetails
