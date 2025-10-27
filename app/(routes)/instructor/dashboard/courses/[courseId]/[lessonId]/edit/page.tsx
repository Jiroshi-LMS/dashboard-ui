"use client"

import { useRouter } from "next/navigation";
import Stepper from "@/app/components/organism/InstructorDashboard/DashboardStepper";
import VideoDetailsUpdateStep from "@/feature/courses/components/lesson-update/VideoDetailsUpdateStep";

const editLessonPage = () => {
    const router = useRouter();
  return (
    <main className="main-container">
        <h1 className="page-title">Edit Lesson</h1>
        <Stepper
            steps={[
                {
                    label: "Lesson Details",
                    content: <VideoDetailsUpdateStep />,
                    onNext: async () => {
                        return true;
                    },
                },
                // {
                //     label: "Lesson Extra Resources",
                //     content: <VideoResourcesStep />,
                //     onNext: async () => {
                //         return true;
                //     },
                // },
                // {
                //     label: "Lesson Video",
                //     content: <VideoUploadStep />,
                //     onNext: async () => {
                //         return true;
                //     },
                // }
            ]}
            onSubmit={async () => {
                console.log("Submitted");
                // router.replace("/instructor/dashboard/courses/");
            }}
            submitLabel="Upload Lesson"
        />

    </main>
  )
}

export default editLessonPage