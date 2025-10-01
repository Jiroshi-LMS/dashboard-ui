"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { UploadIcon } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  courseTitle: z.string().min(2, "Full name must be at least 2 characters."),
  courseDescription: z.string().optional(),
})

const VideoDetailsStep = (props: any) => {

  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          courseTitle: "",
          courseDescription: "",
        },
      })
    
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", values)
  }
  return (
    <main className="my-4">
      <section>
        <div className="w-[80%] mx-auto">
          <h1 className="section-title">Add Lesson Details</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Course Title */}
              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Description */}
              <FormField
                control={form.control}
                name="courseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Lesson Description." {...field} className="h-[10em]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default VideoDetailsStep