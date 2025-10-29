import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z, { boolean } from 'zod'
import { LessonDetailsUpdateFormSchema } from '../../courseSchemas'
import { Button } from '@/components/ui/button'
import { SquarePen, TrashIcon, UploadIcon } from 'lucide-react'
import { Lesson } from '../../courseTypes'
import { Switch } from '@/components/ui/switch'
import { DeleteLessonService, UpdateLessonDetailsService } from '../../courseServices'
import Loader from '@/app/components/atoms/Loader'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'



type LessonDetailsUpdateStepProps = {
  courseId: string,
  lessonId: string,
  lessonData: Lesson,
  router: AppRouterInstance
}

const LessonDetailsUpdateStep = ({courseId, lessonId, lessonData, router}: LessonDetailsUpdateStepProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const lessonDetailsForm = useForm<z.infer<typeof LessonDetailsUpdateFormSchema>>({
      resolver: zodResolver(LessonDetailsUpdateFormSchema),
      defaultValues: {
          title: lessonData?.title || "",
          description: lessonData?.description || "",
          access_status: (lessonData?.access_status === 'active') ? true : false
      },
  })

  const lessonDetailsSubmissionFormHandler = async (
    values: z.infer<typeof LessonDetailsUpdateFormSchema>
  ) => {
    setIsLoading(true)
    await UpdateLessonDetailsService(lessonId, values)
    setIsLoading(false)
  }

  if (isLoading) return <Loader className='h-[70vh]' />

  return (
    <main className="my-4">
      {/* Delete Section */}
            <div className="flex justify-end mb-3">
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center gap-2">
                    <TrashIcon size={16} /> Delete Lesson
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. It will permanently delete your
                        lesson and its data.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={() => {DeleteLessonService(courseId, lessonId, router)}}
                        className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
      <section>
        <div className="w-[80%] mx-auto">
          <h1 className="section-title">Add Lesson Details</h1>
          <Form {...lessonDetailsForm}>
            <form onSubmit={lessonDetailsForm.handleSubmit(lessonDetailsSubmissionFormHandler)} className="space-y-6">

              {/* Course Title */}
              <FormField
                control={lessonDetailsForm.control}
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
                control={lessonDetailsForm.control}
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
                control={lessonDetailsForm.control}
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

export default LessonDetailsUpdateStep