"use client"

import { useRouter } from "next/navigation";
import Stepper from "@/app/components/organism/InstructorDashboard/DashboardStepper";
import React, { useEffect, useState } from "react";
import { FetchLessonByIdService, FetchLessonResourcesService } from "@/feature/courses/courseServices";
import { Lesson, LessonResourcesAll } from "@/feature/courses/courseTypes";
import Loader from "@/app/components/atoms/Loader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { DeleteLessonService } from "@/feature/courses/courseServices";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import LessonDetailsUpdateStep from "@/feature/courses/components/lesson-update/LessonDetailsUpdateStep";
import LessonTextResourceUpdateStep from "@/feature/courses/components/lesson-update/LessonTextResourcesUpdateStep";
import LessonReferenceMaterialUpdate from "@/feature/courses/components/lesson-update/LessonReferenceMaterialUpdate";


interface LessonEditPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

const editLessonPage = ({params}: LessonEditPageProps) => {
    const { courseId, lessonId } = React.use(params);
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [lessonResources, setLessonResources] = useState<LessonResourcesAll | null>(null)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await FetchLessonByIdService(lessonId, setLesson);
            await FetchLessonResourcesService(lessonId, setLessonResources);
            setLoading(false)
        })()
    }, []);

  return (
    <main className="main-container">
        <h1 className="page-title">Edit Lesson</h1>
        {
            (isLoading) ? <Loader className="h-[75vh]" /> :
            (!lesson || !lessonResources) ? 
                <div className="flex justify-center items-center min-h-[75vh] w-full">
                    <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
                        Unable to fetch lesson data. Please try again later...
                    </h1>
                </div>
            :
            <>
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
            <Stepper
                steps={[
                    {
                        label: "Lesson Details",
                        content: <LessonDetailsUpdateStep lessonId={lessonId} lessonData={lesson}/>,
                        onNext: async () => {
                            return true;
                        },
                    },
                    {
                        label: "Lesson Text Resources",
                        content: <LessonTextResourceUpdateStep lessonId={lessonId} resourceData={lessonResources} />,
                        onNext: async () => {
                            return true;
                        },
                    },
                    {
                        label: "Lesson Video",
                        content: <LessonReferenceMaterialUpdate lessonId={lessonId} resourceData={lessonResources} />,
                        onNext: async () => {
                            return true;
                        },
                    }
                ]}
                onSubmit={async () => {
                    console.log("Submitted");
                    // router.replace("/instructor/dashboard/courses/");
                }}
                submitLabel="Save"
            />
            </>
        }
    </main>
  )
}

export default editLessonPage