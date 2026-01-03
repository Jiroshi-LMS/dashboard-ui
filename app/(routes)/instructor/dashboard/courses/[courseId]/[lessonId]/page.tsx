"use client";

import React from "react";
import LessonRetrieveView from "@/feature/courses/components/lessons/LessonRetrieveView";

interface LessonDetailsPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}


const LessonDetailsPage = ({ params }: LessonDetailsPageProps) => {
  const { courseId, lessonId } = React.use(params);

  return (
    <main className="mx-auto py-10 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Lesson Details
        </h1>
      </div>

      <LessonRetrieveView courseId={courseId} lessonId={lessonId} />

    </main>
  );
};

export default LessonDetailsPage;
