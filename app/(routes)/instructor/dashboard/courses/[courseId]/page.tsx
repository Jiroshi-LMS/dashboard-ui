"use client"

import { Clock10Icon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link"
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { page } from "@/lib/constants/RouteConstants";
import CourseRetrieveData from "@/feature/courses/components/CourseRetrieveData";
import { deleteCourseService } from "@/feature/courses/courseServices";
import toast from "react-hot-toast";
import { standardErrors } from "@/lib/constants/errors";
import React from "react";
import { useRouter } from "next/navigation";

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

const static_table_data = [
  {
    "lessonId": 'lesson-1',
    "lesson_name": "Lesson 1",
    "status": "active",
    "duration": 10,
    "created_at": "2023-05-01"
  },
  {
    "lessonId": 'lesson-2',
    "lesson_name": "Lesson 2",
    "status": "inactive",
    "duration": 20,
    "created_at": "2023-05-02"
  },
  {
    "lessonId": 'lesson-3',
    "lesson_name": "Lesson 3",
    "status": "draft",
    "duration": 30,
    "created_at": "2023-05-03"
  },
  {
    "lessonId": 'lesson-4',
    "lesson_name": "Lesson 4",
    "status": "active",
    "duration": 40,
    "created_at": "2023-05-04"
  },
  {
    "lessonId": 'lesson-5',
    "lesson_name": "Lesson 5",
    "status": "inactive",
    "duration": 50,
    "created_at": "2023-05-05"
  },
  {
    "lessonId": 'lesson-6',
    "lesson_name": "Lesson 6",
    "status": "draft",
    "duration": 60,
    "created_at": "2023-05-06"
  },
  {
    "lessonId": 'lesson-7',
    "lesson_name": "Lesson 7",
    "status": "draft",
    "duration": 30,
    "created_at": "2023-05-03"
  },
  {
    "lessonId": 'lesson-8',
    "lesson_name": "Lesson 8",
    "status": "active",
    "duration": 40,
    "created_at": "2023-05-04"
  },
  {
    "lessonId": 'lesson-9',
    "lesson_name": "Lesson 9",
    "status": "inactive",
    "duration": 50,
    "created_at": "2023-05-05"
  },
  {
    "lessonId": 'lesson-10',
    "lesson_name": "Lesson 10",
    "status": "draft",
    "duration": 60,
    "created_at": "2023-05-06"
  }
]

const courseDetailsPage = ({params}: CourseDetailsPageProps) => {
  const router = useRouter()
  const { courseId } = React.use(params)

  const handleCourseDeletion = async() => {
    try {
      const resp = await deleteCourseService(courseId)
      if (resp?.status){
        toast.success("Course has been removed successfully !")
        router.replace(page.LIST_COURSE)
      }
      else toast.error("Could not delete course! Please try again later.")
    } catch (err: any) {
      toast.error(
        err?.response?.data?.msg ||
        err?.message ||
        standardErrors.UNKNOWN
      )
    }
  }

  return (
    <main className="main-container">
      <h1 className="page-title">Course Details</h1>

      <div className="relative flex flex-col justify-start items-start w-full min-h-screen">
        <CourseRetrieveData courseId={courseId} />

        <div className="flex justify-end items-center w-full my-3 gap-3">
          <Link href={page.CREATE_COURSE}>
            <Button className='bg-blue-400 text-white hover:bg-blue-500 hover:text-white cursor-pointer'><PlusIcon /> Add another course</Button>
          </Link>
          <Link href={`/instructor/dashboard/courses/${courseId}/edit`}>
            <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PencilIcon /> Edit Course</Button>
          </Link>
        </div>

        <section className="h-full w-full">
          <h2 className="section-title">All Lessons</h2>
          <section className='flex justify-between items-center my-4'>
            <div className='flex justify-start items-center gap-2'>
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Statuses</SelectLabel>
                      <SelectItem value="active" className='hover:text-white'>Active</SelectItem>
                      <SelectItem value="inactive" className='hover:text-white'>Inactive</SelectItem>
                      <SelectItem value="draft" className='hover:text-white'>Draft</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <form>
                <Input type="search" placeholder="Search by course name" />
              </form>
            </div>
            <div>
              <Link href={page.CREATE_LESSON(courseId)}>
                <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PlusIcon /> Add new lesson</Button>
              </Link>
            </div>
          </section>

          {
            static_table_data.map((data, index) => {
              let lessonBadgeColor = 'bg-primary text-white'
              if (data.status === 'inactive') {
                lessonBadgeColor = 'bg-red-400 text-white'
              } else if (data.status === 'draft') {
                lessonBadgeColor = 'bg-blue-400 text-white'
              }
              return (
                <div key={index} className="flex flex-col justify-center items-start w-full p-3 nth-[2n]:bg-gray-100 border-[1px] border-gray-200 rounded-sm my-1">
                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-bold text-gray-600 my-3">
                      <Link href={`/instructor/dashboard/courses/lessons/${data.lessonId}`} className="hover:text-teal-500">{data.lesson_name}</Link>
                    </h4>
                    <span className="ml-2"><Badge className={`${lessonBadgeColor} uppercase`}>{data.status}</Badge></span>
                  </div>
                  <p className="my-1 line-clamp-2 text-[12px] text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi quisquam ullam, repellat eos ipsa quod, distinctio nihil laudantium aut in perferendis illum quidem excepturi quibusdam perspiciatis atque ad dolorem?</p>
                  <div className="flex justify-between items-center w-full my-1">
                    <span className="flex items-center text-gray-400 text-[14px]"><Clock10Icon className="h-3 w-3 mr-1"/> {data.duration} hours</span>
                    <span className="text-gray-400 text-[14px]">{data.created_at}</span>
                  </div>
                </div>
              )
            })
          }
          <Pagination className='my-5'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {
              Array.from({ length: static_table_data.length }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#">{index + 1}</PaginationLink>
                </PaginationItem>
              ))
            } 
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </div>
      {/* <div className="flex justify-end items-center w-full">
          <Button className="bg-red-400 hover:bg-red-500 cursor-pointer"></Button>
      </div> */}
      <div className="flex justify-end items-center w-full">
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-500 cursor-pointer
          text-white px-2 py-2 font-semibold text-[13px] rounded-md mt-10"> <TrashIcon className="w-4" /> Delete Course</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your course
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
              onClick={handleCourseDeletion}
              className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  )
}

export default courseDetailsPage