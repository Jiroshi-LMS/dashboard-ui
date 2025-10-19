"use client"
import React, { useEffect, useRef, useState } from "react"

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { fetchCourseById, updateCourseService } from "@/feature/courses/courseServices"
import toast from "react-hot-toast"
import { Course } from "@/feature/courses/courseTypes"
import { standardErrors } from "@/lib/constants/errors"
import Loader from "@/app/components/atoms/Loader"
import { page } from "@/lib/constants/RouteConstants"
import { useRouter } from "next/navigation"
import { updateCourseFormSchema } from "@/feature/courses/courseSchemas"
import { constantFilenames, fileContentTypes, fileUploadPrefixes, PUBLIC_UPLOAD } from "@/lib/constants/FileConstants"
import { units } from "@/lib/constants/common"
import { useAppSelector } from "@/hooks/useRedux"
import { RootState } from "@/store"
import { usePresignedUpload } from "@/hooks/usePresignedUpload"
import { Progress } from "@/components/ui/progress"

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

const editCoursePage = ({params}: CourseDetailsPageProps) => {
  const router = useRouter()
  const allowedFileSize = 5;

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const { courseId } = React.use(params)

  const thumbnailUploadRef = useRef<HTMLInputElement | null>(null)

  const { uploadFile } = usePresignedUpload(
      constantFilenames.COURSE_THUMBNAIL,
      fileUploadPrefixes.COURSE_THUMBNAIL,
      PUBLIC_UPLOAD
  );

  const form = useForm<z.infer<typeof updateCourseFormSchema>>({
    resolver: zodResolver(updateCourseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      access_status: false,
      thumbnail: undefined
    },
  })

  useEffect(() => {
    setLoading(true);
    fetchCourseById(courseId, setCourse, setLoading);
  }, [courseId]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!thumbnailFile) return;
      e.preventDefault()
      e.returnValue = "" // required for Chrome to trigger the prompt
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    const courseState = (course?.access_status === 'active') ? true : false
    form.setValue("title", course?.title as string)
    form.setValue("description", course?.description as string)
    form.setValue("access_status", courseState)
  }, [course])

  useEffect(() => {
      const uploadProgressTimeout = setTimeout(() => {
        if (thumbnailUploadProgress === 100) setThumbnailUploadProgress(0)
      }, 500)
      return () => {clearTimeout(uploadProgressTimeout)}
  }, [thumbnailUploadProgress, setThumbnailUploadProgress])

  const thumbnailImageChange = async (file: File | undefined) => {
    try {
      if (!file) return;
      const contentType = file.type;
      if (
        contentType !== fileContentTypes.PNG &&
        contentType !== fileContentTypes.JPG &&
        file.size > allowedFileSize * units.MB
      )
        throw new Error("Please provide a valid file format.");
      const { objectKey } = await uploadFile(
        file,
        contentType,
        setThumbnailUploadProgress
      );
      setThumbnailFile(file);
      form.setValue("thumbnail", objectKey);
    } catch (err: any) {
      toast.error(
        err?.message ?? "Something went wrong! Please try again later."
      );
    }
  };
  
  const onSubmit = async (values: z.infer<typeof updateCourseFormSchema>) => {
    try {
      if (values.description === "") values.description = undefined;
      setLoading(true);
      const resp = await updateCourseService(courseId, values);
      if (!resp?.status)
        return toast.error(
          resp?.msg ?? "Unable to update your course! Please try again later."
        );
      toast.success("Course Updated Successfully !");
      setLoading(false);
      if (resp?.response?.course_id)
        router.replace(page.RETRIEVE_COURSE(courseId));
    } catch (err: any) {
      setLoading(false);
      console.log(err)
      toast.error(
        err?.response?.data?.msg ||
        err?.message ||
          "Couldn't update your course info! Please try again later."
      );
    }
  };

  return (
    <main className="main-container">
      <h1 className="page-title">Edit Course Details</h1>
      <hr/>

      {
        (isLoading) ? <Loader className="h-[80vh]" /> :
      <section className="w-[80%] mx-auto">
        {!course ? (
          <div className="flex justify-center items-center min-h-[40vh] w-full">
            <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
              Unable to fetch course information. Please try again later...
            </h1>
          </div>
        ) : (
        <>
        <div className="w-full">
          <h2 className="section-title mb-1">Course Thumbnail</h2>
          <p className="text-gray-600 text-sm mb-3 font-medium">
            You can update your course thumbnail here.
          </p>

          {
            (thumbnailUploadProgress > 0) ? 
          <div className="flex justify-center items-center w-full max-w-4xl mx-auto h-[40vh] rounded-lg overflow-hidden border-2
              border-dashed border-gray-300 hover:border-teal-600">
            <Progress value={thumbnailUploadProgress} className="w-[60%]" />
          </div> : 
          <div
            onClick={() => thumbnailUploadRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              thumbnailImageChange(e.dataTransfer.files?.[0]);
            }}
            className={`relative w-full max-w-4xl mx-auto h-[40vh] rounded-lg overflow-hidden border-2
              border-dashed border-gray-300 hover:border-teal-600
              bg-gray-100 transition-all duration-300 flex justify-center items-center group cursor-pointer`}
          >
            {thumbnailFile ? (
              <Image
                src={URL.createObjectURL(thumbnailFile)}
                alt="Course Thumbnail Preview"
                fill
                className="object-contain bg-gray-900/5"
              />
            ) : course?.thumbnail_url ? (
              <Image
                src={course.thumbnail_url as string}
                alt={course.title as string}
                fill
                className="object-contain bg-gray-900/5"
              />
            ) : (
              <div className="flex flex-col justify-center items-center text-gray-500 h-full">
                <UploadIcon className="w-6 h-6 mb-2" />
                <p className="text-sm font-medium">No thumbnail uploaded</p>
              </div>
            )}

            <div
              className={`absolute inset-0 z-10 flex flex-col justify-center items-center text-center gap-2 px-4
                ${(course?.thumbnail_url || isDragging) ? "bg-black/40 text-white opacity-0 group-hover:opacity-100" : "bg-transparent text-gray-600"}
                transition-opacity duration-300`}
            >
              <span className="font-semibold text-sm sm:text-base flex items-center gap-2">
                {isDragging
                ? "Drop Here ..."
                : `Drag n Drop or Click to upload image (Max ${allowedFileSize}MB)`}
                <UploadIcon className="h-5 w-5 ml-2" />
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={thumbnailUploadRef}
              onChange={(e) => thumbnailImageChange(e.target.files?.[0])}
            />
          </div>
          }
        </div>
        <div>
          <h2 className="section-title">Course Details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Course Status */}
              <FormField
                control={form.control}
                name="access_status"
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
                name="title"
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
                name="description"
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
                <Button 
                type="button"
                onClick={() => {router.back()}}
                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
        </>
      )}
      </section>
    }
    </main>
  )
}

export default editCoursePage