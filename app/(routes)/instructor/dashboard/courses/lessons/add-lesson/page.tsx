"use client"

import { useRouter } from "next/navigation";
import Stepper from "@/app/components/organisms/InstructorDashboard/DashboardStepper"
import VideoDetailsStep from "@/app/components/stepper-content/lesson-upload/VideoDetailsStep";
import VideoResourcesStep from "@/app/components/stepper-content/lesson-upload/VideoResourcesStep";
import VideoUploadStep from "@/app/components/stepper-content/lesson-upload/VideoUploadStep";

const addLessonPage = () => {
    const router = useRouter();
  return (
    <main className="main-container">
        <h1 className="page-title">Add New Lesson</h1>
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

export default addLessonPage