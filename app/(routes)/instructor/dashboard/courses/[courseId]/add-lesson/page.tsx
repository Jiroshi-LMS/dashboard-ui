"use client"

import { useRouter } from "next/navigation";

import Stepper from "@/app/components/organism/InstructorDashboard/DashboardStepper";
import VideoDetailsStep from "@/feature/courses/components/lesson-upload/VideoDetailsStep";
import VideoTextResourcesStep from "@/feature/courses/components/lesson-upload/VideoTextResourcesStep";
import VideoUploadStep from "@/feature/courses/components/lesson-upload/VideoUploadStep";
import React, { useEffect, useState } from "react";
import z from "zod";
import { VideoDetailsFormSchema } from "@/feature/courses/courseSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { withFormValidation } from "@/lib/utils";
import { CreateLessonWithDetails, UpdateLessonMediaService } from "@/feature/courses/courseServices";
import { page } from "@/lib/constants/RouteConstants";
import VideoReferenceMaterialsStep from "@/feature/courses/components/lesson-upload/VideoReferenceMaterialsStep";
import toast from "react-hot-toast";
import { usePresignedUpload } from "@/hooks/usePresignedUpload";
import { constantFilenames, fileUploadPrefixes, PRIVATE_UPLOAD } from "@/lib/constants/FileConstants";
import { LessonMediaData } from "@/feature/courses/courseTypes";

interface CreateLessonPageProps {
  params: Promise<{ courseId: string }>;
}

const addLessonPage = ({params}: CreateLessonPageProps) => {
    const router = useRouter();
    const { courseId } = React.use(params)
    const [lessonId, setLessonId] = useState<string | null>(null)
    const [lessonMediaUploadProgress, setLessonMediaUploadProgress] = useState<number>(0)
    const [lessonMediaFile, setLessonMediaFile] = useState<LessonMediaData>({
        file: null,
        duration: 0
    })

    const {uploadFile: uploadLessonMedia, cancelUpload: cancelLessonMediaUpload} = usePresignedUpload(
        constantFilenames.LESSON_MEDIA,
        fileUploadPrefixes.LESSON_MEDIA,
        PRIVATE_UPLOAD,
        courseId
    )

    const videoDetailsForm = useForm<z.infer<typeof VideoDetailsFormSchema>>({
        resolver: zodResolver(VideoDetailsFormSchema),
        defaultValues: {
            title: "",
            description: "",
            course_uuid: courseId
        },
    })

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ""; // Required for Chrome
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

  return (
    <main className="main-container">
        <h1 className="page-title">Add New Lesson</h1>
        <Stepper
            steps={[
                {
                    label: "Lesson Details",
                    content: <VideoDetailsStep
                            form={videoDetailsForm}
                            />,
                    onNext: withFormValidation(
                        videoDetailsForm, 
                        async (values: z.infer<typeof VideoDetailsFormSchema>): Promise<boolean> => {
                            if (lessonId) return true;
                            const response = await CreateLessonWithDetails(values)
                            if (response?.success && response?.lesson_uuid) {
                                setLessonId(response.lesson_uuid)
                                return true;
                            }
                            return false;
                        }
                    ),
                },
                {
                    label: "Lesson Text Resources",
                    content: <VideoTextResourcesStep lessonId={lessonId} />,
                    onNext: async () => true
                },
                {
                    label: "Lesson Reference Material",
                    content: <VideoReferenceMaterialsStep lessonId={lessonId} />,
                    onNext: async () => true
                },
                {
                    label: "Lesson Video",
                    content: <VideoUploadStep 
                                lessonId={lessonId} 
                                fileData={lessonMediaFile} 
                                setFileData={setLessonMediaFile}
                                uploadProgress={lessonMediaUploadProgress}
                                cancelUpload={cancelLessonMediaUpload}
                            />,
                    onNext: async () => {
                        if (!lessonId) return false
                        if (!lessonMediaFile) {
                            toast.error("Please select a valid media!")
                            return false;
                        }
                        return await UpdateLessonMediaService(
                            lessonId,
                            lessonMediaFile, 
                            uploadLessonMedia,
                            setLessonMediaUploadProgress
                        )
                    },
                }
            ]}
            onSubmit={()=>{
                router.push(page.RETRIEVE_COURSE(courseId))
            }}
            submitLabel="Upload Lesson"
        />

    </main>
  )
}

export default addLessonPage