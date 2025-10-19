"use client"
import React from "react"
import CourseUpdateForm from "@/feature/courses/components/CourseUpdateForm"

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

const editCoursePage = ({params}: CourseDetailsPageProps) => {
  const { courseId } = React.use(params)

  return (
    <main className="main-container">
      <h1 className="page-title">Edit Course Details</h1>
      <hr/>
      <CourseUpdateForm courseId={courseId} />
    </main>
  )
}

export default editCoursePage