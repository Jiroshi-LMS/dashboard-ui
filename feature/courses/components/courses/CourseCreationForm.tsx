"use client";

import { usePresignedUpload } from "@/hooks/usePresignedUpload";
import {
  constantFilenames,
  fileContentTypes,
  fileUploadPrefixes,
  PUBLIC_UPLOAD,
} from "@/lib/constants/FileConstants";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { courseCreationFormSchema } from "../../courseSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { units } from "@/lib/constants/common";
import toast from "react-hot-toast";
import { createCourseService } from "../../courseServices";
import { page } from "@/lib/constants/RouteConstants";
import Loader from "@/app/components/atoms/Loader";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CourseCreationForm = () => {
  const router = useRouter();
  const allowedFileSize = 5;

  const { uploadFile } = usePresignedUpload(
    constantFilenames.COURSE_THUMBNAIL,
    fileUploadPrefixes.COURSE_THUMBNAIL,
    PUBLIC_UPLOAD
  );

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const thumbnailUploadRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof courseCreationFormSchema>>({
    resolver: zodResolver(courseCreationFormSchema),
    defaultValues: {
      thumbnail: "",
      title: "",
      description: "",
    },
  });

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
      form.setValue("thumbnail", objectKey as string);
    } catch (err: any) {
      toast.error(
        err?.message ?? "Something went wrong! Please try again later."
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof courseCreationFormSchema>) => {
    try {
      if (!values.thumbnail) return toast.error("Please upload a thumbnail!");
      if (values.description === "") values.description = undefined;
      setIsLoading(true);
      const resp = await createCourseService(values);
      if (!resp?.status)
        return toast.error(
          resp?.msg ?? "Unable to create your course! Please try again later."
        );
      toast.success("Course Created Successfully !");
      setIsLoading(false);
      if (resp?.response?.course_id)
        router.replace(page.CREATE_LESSON(resp?.response?.course_id));
      else router.replace(page.LIST_COURSE);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(
        err?.message ||
          "Couldn't create your course! Please try again later."
      );
    }
  };

  if (isLoading) return <Loader className="h-screen" />;

  return (
    <section className="w-[80%] mx-auto">
      <div>
        <h2 className="section-title">Course Thumbnail *</h2>
        <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
          Upload the course thumbnail, it will be the display image for your
          course.
        </p>
        {
          thumbnailUploadProgress > 0 ?
          <div className="flex justify-center items-center h-[40vh] w-full mx-auto
          border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[14px] 
          text-gray-600 cursor-pointer">
            <Progress value={thumbnailUploadProgress} className="w-[60%]" />
          </div> 
        :
        <div
          onClick={() => {
            thumbnailUploadRef?.current?.click();
          }}
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
          className="flex justify-center items-center h-[40vh] w-full mx-auto
          border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[14px] 
          text-gray-600 cursor-pointer"
        >
          <input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            ref={(e) => {
              thumbnailUploadRef.current = e;
            }}
            onChange={(e) => thumbnailImageChange(e.target.files?.[0])}
          />
          {thumbnailFile ? (
            <Image
              src={URL.createObjectURL(thumbnailFile)}
              height={400}
              width={600}
              className="h-full w-auto bg-black"
              alt="Selected Thumbnail File"
            />
          ) : (
            <p className="flex">
              {isDragging
                ? "Drop Here ..."
                : `Drag n Drop or Click to upload image (Max ${allowedFileSize}MB)`}
              <UploadIcon className="h-5 w-5 ml-2" />
            </p>
          )}
        </div>
        }
      </div>

      <div>
        <h2 className="section-title">Course Details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title *</FormLabel>
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
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 cursor-pointer text-white"
              >
                Save Course
              </Button>
              <Button
                type="button"
                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CourseCreationForm;
