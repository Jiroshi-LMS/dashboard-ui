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
import { fetchCourseById, toggleCourseStatusService } from "../../courseServices";
import { Course } from "../../courseTypes";
import { cn, convertSeconds, getStringifiedDuration } from "@/lib/utils";
import { page } from "@/lib/constants/RouteConstants";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CourseRetrieveData = ({ courseId }: { courseId: string }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isToggling, setToggling] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCourseById(courseId, setCourse, setLoading);
  }, [courseId]);

  const handleToggleStatus = async () => {
    if (!course) return;
    setToggling(true);
    try {
      const resp = await toggleCourseStatusService(courseId);
      if (resp?.status) {
        toast.success(`Course ${course.access_status === 'active' ? 'inactivated' : 'activated'} successfully!`);
        // Refresh course data
        fetchCourseById(courseId, setCourse, (loading) => { });
      } else {
        toast.error(resp?.msg || "Failed to toggle status!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setToggling(false);
    }
  };


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
          <div className="flex flex-col justify-start w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{course.title}</h2>

            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <Badge className={cn(
                  "flex items-center gap-1.5 uppercase transition-colors px-2.5 py-0.5 rounded-full text-[10px] border-none font-bold",
                  course.access_status === 'active' ? "bg-teal-500 text-white" :
                    course.access_status === 'inactive' ? "bg-red-500 text-white" :
                      "bg-sky-500 text-white"
                )}>
                  <ActivityIcon className="h-3.5 w-3.5" /> {course.access_status}
                </Badge>

                {course.access_status !== "draft" && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm transition-all hover:bg-gray-50 group">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tight transition-all",
                      course.access_status === 'inactive' ? "text-red-600" : "text-gray-300"
                    )}>OFF</span>
                    <div className="relative flex items-center">
                      <Switch
                        checked={course.access_status === "active"}
                        onCheckedChange={handleToggleStatus}
                        disabled={isToggling}
                        className="scale-75 data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-slate-200"
                      />
                      {isToggling && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-full z-20">
                          <Loader2 className="h-2 w-2 animate-spin text-teal-600" />
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tight transition-all",
                      course.access_status === 'active' ? "text-teal-600" : "text-gray-300"
                    )}>ON</span>
                  </div>
                )}
              </div>

              <span className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                <Clock10Icon className="h-3.5 w-3.5 mr-1.5" />
                {getStringifiedDuration(course.duration)}
              </span>
            </div>

            <div className="flex flex-wrap justify-between text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <Link href={`${page.LIST_ENROLLMENTS}?course_uuid=${course.uuid}`} className="flex items-center hover:text-teal-500 transition-colors">
                <UsersIcon className="h-4 w-4 mr-1.5" />
                {course.enrollments} Enrollments
              </Link>
              <span className="flex items-center">
                <Calendar1Icon className="h-4 w-4 mr-1.5" />
                {course.created_at}
              </span>
            </div>

            <div className="pt-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Course Description
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed text-left max-h-[120px] overflow-auto pr-2 custom-scrollbar font-medium">
                {course.description || "No description provided."}
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default CourseRetrieveData;
