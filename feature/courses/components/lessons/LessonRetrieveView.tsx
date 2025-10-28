"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityIcon, Calendar1Icon, Clock10Icon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Lesson } from '../../courseTypes'
import { DeleteLessonService, FetchLessonByIdService } from '../../courseServices'
import Loader from '@/app/components/atoms/Loader'
import { Badge } from '@/components/ui/badge'
import { getStringifiedDuration } from '@/lib/utils'
import LessonResourceRetrieveView from './LessonResourceRetrieveView'
import { page } from '@/lib/constants/RouteConstants'
import { useRouter } from 'next/navigation'


const LessonRetrieveView = ({courseId, lessonId}: {courseId: string, lessonId: string}) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    FetchLessonByIdService(lessonId, setLesson, setLoading);
  }, []);

  const badgeColor =
    lesson?.access_status === "inactive"
      ? "bg-red-500"
      : lesson?.access_status === "draft"
      ? "bg-blue-500"
      : "bg-teal-500";


  if (isLoading) return <Loader className='h-[75vh]' />
  if (!lesson && !isLoading) return (
    <div className="flex justify-center items-center min-h-[75vh] w-full">
        <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
            Unable to fetch lesson information. Please try again later...
        </h1>
    </div>
  )

  return (
    <>
    {/* Lesson Overview Section (Video + Info + Description Combined) */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {lesson?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Video */}
          {
            (lesson?.video_url) ?
          
          <div className="rounded-md overflow-hidden bg-black relative">
            <video
              className="w-full h-[60vh] object-contain"
              controls
              playsInline
            >
              <source
                src={lesson?.video_url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          :
          <div className='text-red-400 text-center font-bold text-lg'>
            Video hasn't been uploaded yet !
          </div>
        }

          {/* Meta Info */}
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div className="flex gap-4">
              <Badge
                className={`${badgeColor} text-white capitalize flex items-center gap-1`}
              >
                <ActivityIcon size={12} /> {lesson?.access_status}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock10Icon size={14} /> {getStringifiedDuration(lesson?.duration || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Calendar1Icon size={14} /> {lesson?.created_at}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 text-sm leading-relaxed border-t pt-3 max-h-40 overflow-y-auto">
            <p>
              {lesson?.description as string}
            </p>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end">
            <Link
              href={page.EDIT_LESSON(courseId, lessonId)}
            >
              <Button
                size="sm"
                className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-sm"
              >
                <PencilIcon size={14} />
                Edit Lesson
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <LessonResourceRetrieveView lessonId={lessonId} />

      {/* Delete Section */}
      <div className="flex justify-end mt-20">
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
    </>
  )
}

export default LessonRetrieveView