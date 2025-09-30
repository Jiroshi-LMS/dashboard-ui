"use client"

import { useRouter } from "next/navigation";
import Stepper from "@/app/components/organism/InstructorDashboard/DashboardStepper"

const addLessonPage = () => {
    const router = useRouter();
  return (
    <main className="main-container">
        <h1 className="page-title">Add New Lesson</h1>
        <Stepper
            steps={[
                {
                    label: "Video Details",
                    content: <VideoDetailsStep />,
                    onNext: async () => {
                        return true;
                    },
                },
                {
                    label: "Video Upload",
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

const VideoDetailsStep = () => {
    return (
        <div>videoDetailsStep</div>
    )
}

const VideoUploadStep = () => {
    return (
        <div>videoUploadStep</div>
    )
}

export default addLessonPage