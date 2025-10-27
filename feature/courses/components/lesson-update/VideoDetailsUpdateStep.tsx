import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { VideoDetailsUpdateFormSchema } from '../../courseSchemas'
import { Button } from '@/components/ui/button'
import { SquarePen, TrashIcon, UploadIcon } from 'lucide-react'
import { Lesson } from '../../courseTypes'
import { Switch } from '@/components/ui/switch'



type VideoDetailsUpdateStepProps = {
  courseId: string,
  lessonId: string,
  lessonData: Lesson
}

const VideoDetailsUpdateStep = ({courseId, lessonId, lessonData}: VideoDetailsUpdateStepProps) => {

  const videoDetailsForm = useForm<z.infer<typeof VideoDetailsUpdateFormSchema>>({
      resolver: zodResolver(VideoDetailsUpdateFormSchema),
      defaultValues: {
          title: lessonData?.title || "",
          description: lessonData?.description || "",
          access_status: (lessonData?.access_status === 'active') ? true : false,
          course_uuid: courseId
      },
  })

  return (
    <main className="my-4">
      <section>
        <div className="w-[80%] mx-auto">
          <h1 className="section-title">Add Lesson Details</h1>
          <Form {...videoDetailsForm}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

              {/* Course Title */}
              <FormField
                control={videoDetailsForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Description */}
              <FormField
                control={videoDetailsForm.control}
                name="description"
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

              <FormField
                control={videoDetailsForm.control}
                name="access_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Lesson Active</FormLabel>
                    <FormControl>
                        <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                >
                  <SquarePen size={16} />
                  Update details
                </Button>
            </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default VideoDetailsUpdateStep