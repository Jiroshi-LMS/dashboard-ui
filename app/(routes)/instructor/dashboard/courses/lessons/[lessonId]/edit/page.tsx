"use client"

import { useRouter } from "next/navigation";
import VideoDetailsStep from "@/feature/courses/components/lesson-upload/VideoDetailsStep";
import VideoResourcesStep from "@/feature/courses/components/lesson-upload/VideoResourcesStep";
import VideoUploadStep from "@/feature/courses/components/lesson-upload/VideoUploadStep";
import Stepper from "@/app/components/organism/InstructorDashboard/DashboardStepper";

const editLessonPage = () => {
    const router = useRouter();
  return (
    <main className="main-container">
        <h1 className="page-title">Edit Lesson</h1>
        <Stepper
            steps={[
                {
                    label: "Lesson Details",
                    content: <VideoDetailsStep />,
                    onNext: async () => {
                        return true;
                    },
                },
                {
                    label: "Lesson Extra Resources",
                    content: <VideoResourcesStep />,
                    onNext: async () => {
                        return true;
                    },
                },
                {
                    label: "Lesson Video",
                    content: <VideoUploadStep />,
                    onNext: async () => {
                        return true;
                    },
                }
            ]}
            onSubmit={async () => {
                console.log("Submitted");
                router.replace("/instructor/dashboard/courses/");
            }}
            submitLabel="Upload Lesson"
        />

    </main>
  )
}

export default editLessonPage