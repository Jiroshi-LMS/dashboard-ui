"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { PlusIcon, UploadIcon } from "lucide-react"
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
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  lessonNotes: z.string().optional(),
})

const VideoResourcesStep = (props: any) => {
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
              lessonNotes: "",
            },
          })
        
    const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", values)
    }
  return (
    <main className="">
      <section>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Lesson Notes */}
                <div className="w-[80%] mx-auto">
                    <h1 className="section-title">Add Lesson Notes</h1>
                    <FormField
                        control={form.control}
                        name="lessonNotes"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lesson Notes</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Lesson Notes" {...field} className="h-[10em]" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                <div className="w-[80%] mx-auto">
                    <h1 className="section-title">Add Reference URLs</h1>
                    <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
                        Add multiple reference URLs for your lesson.
                    </p>
                    <div className="my-6 flex flex-col justify-center items-start gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="url-title" className="text-[14px]">URL Title</Label>
                            <Input placeholder="URL Title" className="w-full" name="url-title" id="url-title" />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="reference-url" className="text-[14px]">Reference URL</Label>
                            <Input placeholder="Reference URL" className="w-full" name="reference-url" id="reference-url" />
                        </div>
                        <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PlusIcon /> Add Reference URL</Button>
                    </div>
                </div>

                <div className="w-[80%] mx-auto">
                    <h1 className="section-title">Add Reference Materials</h1>
                    <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
                        Add multiple PDF, PPTX, DOCX or other reference materials for your lesson.
                    </p>
                    <div className="my-6 flex flex-col justify-center items-start gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="url-title" className="text-[14px]">Document Title</Label>
                            <Input placeholder="URL Title" className="w-full" name="url-title" id="url-title" />
                        </div>
                        <div>
                            <span className="text-[14px] font-medium" >Upload Reference Material File</span>
                            <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
                                Upload the reference material file here, it will be downloadable by the enrolled members of the course.
                            </p>
                            <div className="flex justify-center items-center h-[6em] w-[20em] px-4
                            border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[12px] text-gray-600">
                                Drag & drop or click to upload image (Max 5MB) <UploadIcon />
                            </div>
                        </div>
                        <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><UploadIcon /> Upload Reference</Button>
                    </div>
                </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default VideoResourcesStep