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
import LessonVideoUpdateStep from "@/feature/courses/components/lesson-update/LessonVideoUpdateStep";


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
            <Stepper
                steps={[
                    {
                        label: "Update Lesson Details",
                        content: <LessonDetailsUpdateStep 
                                    courseId={courseId} 
                                    lessonId={lessonId} 
                                    lessonData={lesson}
                                    router={router}
                                />,
                        onNext: async () => {
                            return true;
                        },
                    },
                    {
                        label: "Update Lesson Text Resources",
                        content: <LessonTextResourceUpdateStep lessonId={lessonId} resourceData={lessonResources} />,
                        onNext: async () => {
                            return true;
                        },
                    },
                    {
                        label: "Update Lesson Reference Material",
                        content: <LessonReferenceMaterialUpdate lessonId={lessonId} resourceData={lessonResources} />,
                        onNext: async () => {
                            return true;
                        },
                    },
                    {
                        label: "Update Lesson Video",
                        content: <LessonVideoUpdateStep 
                                    courseId={courseId} 
                                    lessonId={lessonId} 
                                    lessonData={lesson}
                                />,
                        onNext: async () => {
                            return true;
                        }
                    }
                ]}
                onSubmit={async () => {
                    router.back();
                }}
                submitLabel="Done"
            />
            </>
        }
    </main>
  )
}

export default editLessonPage