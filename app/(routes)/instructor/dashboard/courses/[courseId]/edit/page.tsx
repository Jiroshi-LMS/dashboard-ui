"use client"
import React from "react"

import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  courseStatus: z.boolean(),
  courseTitle: z.string().min(2, "Full name must be at least 2 characters."),
  courseDescription: z.string().optional(),
})

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

const editCoursePage = ({params}: CourseDetailsPageProps) => {
  const { courseId } = React.use(params)

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        courseStatus: true,
        courseTitle: "course-1",
        courseDescription: "",
      },
    })
  
    const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log("Form Submitted:", values)
    }

  return (
    <main className="main-container">
      <h1 className="page-title">Edit Course Details</h1>

      <section>

        <div>
          <h2 className="section-title">Course Thumbnail</h2>
          <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
            Upload the course thumbnail, it will be the display image for your course.
          </p>
          <div className="relative h-[40vh]">
                <Image src="https://img.freepik.com/free-photo/serious-young-caucasian-geometry-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom-holding-hourglass-vertically-looking-it_141793-105472.jpg" 
                className="absolute top-0 left-[50%] translate-x-[-50%] h-full object-cover"
                height={400}
                width={600}
                alt="course thumbnail" 
                />
                <div className="relative flex justify-center items-center h-full w-[80%] mx-auto bg-[#00000072]
            border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[14px] text-white">
                    Drag & drop or click to upload image (Max 5MB) <UploadIcon />
                </div>
          </div>
          
        </div>

        <div>
          <h2 className="section-title">Course Details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Course Status */}
              <FormField
                control={form.control}
                name="courseStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Course Active</FormLabel>
                    <FormControl>
                        <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Title */}
              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Course Title" {...field} />
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
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Course Description." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="flex justify-end items-center gap-4">
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 cursor-pointer text-white">
                  Save Course
                </Button>
                <Button className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </section>

    </main>
  )
}

export default editCoursePage