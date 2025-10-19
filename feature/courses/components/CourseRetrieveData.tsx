"use client";

import Loader from "@/app/components/atoms/Loader";
import { Badge } from "@/components/ui/badge";
import {
  ActivityIcon,
  Calendar1Icon,
  Clock10Icon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchCourseById } from "../courseServices";
import { Course } from "../courseTypes";

const CourseRetrieveData = ({ courseId }: { courseId: string }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCourseById(courseId, setCourse, setLoading);
  }, [courseId]);

  let badge_color = "bg-primary text-white";
  if (course?.access_status === "inactive") {
    badge_color = "bg-red-400 text-white";
  } else if (course?.access_status === "draft") {
    badge_color = "bg-blue-400 text-white";
  }

  if (isLoading) return <Loader className="h-[30vh]" />;
  return (
    <aside className="flex flex-col lg:flex-row gap-6 bg-gray-50 w-full p-4 rounded-xl shadow-sm">
      {!course ? (
        <div className="flex justify-center items-center min-h-[40vh] w-full">
          <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
            Unable to fetch course information. Please try again later...
          </h1>
        </div>
      ) : (
        <>
          {/* Thumbnail */}
          <div className="flex justify-center items-center bg-[#202020] border-2 border-teal-700 rounded-lg overflow-hidden flex-shrink-0 w-full lg:w-1/2">
            <Image
              src={course.thumbnail_url as string}
              alt={course.title}
              width={600}
              height={400}
              className="object-contain w-full h-full max-h-[350px]"
            />
          </div>

          {/* Course Details */}
          <div className="flex flex-col justify-start w-full lg:w-1/2 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>

            <div className="flex flex-wrap justify-between text-gray-500 text-sm">
              <span className="flex items-center">
                <Clock10Icon className="h-4 w-4 mr-1" />
                {course.duration} hours
              </span>
              <Badge className={`${badge_color} flex items-center gap-1 uppercase`}>
                <ActivityIcon className="h-4 w-4" /> {course.access_status}
              </Badge>
            </div>

            <div className="flex flex-wrap justify-between text-gray-500 text-sm">
              <span className="flex items-center">
                <UsersIcon className="h-4 w-4 mr-1" />
                {course.enrollments} Enrollments
              </span>
              <span className="flex items-center">
                <Calendar1Icon className="h-4 w-4 mr-1" />
                {course.created_at}
              </span>
            </div>

            <div className="pt-2">
              <h4 className="font-semibold text-gray-700 mb-2">
                Course Description
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed text-justify max-h-[10rem] overflow-auto pr-1">
                {course.description || "N/A"}
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default CourseRetrieveData;
