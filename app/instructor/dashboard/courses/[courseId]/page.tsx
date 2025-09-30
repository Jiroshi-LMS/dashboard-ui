import { ActivityIcon, Calendar1Icon, Clock10Icon, PencilIcon, PlusIcon, TrashIcon, UsersIcon } from "lucide-react";
import Image from "next/image"
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const courseDetailsPage = async ({params}: CourseDetailsPageProps) => {
  const { courseId } = await params
  let courseStatus = "active"
  let badge_color = 'bg-primary text-white'
  if (courseStatus === 'inactive') {
    badge_color = 'bg-red-400 text-white'
  } else if (courseStatus === 'draft') {
    badge_color = 'bg-blue-400 text-white'
  }
  return (
    <main className="main-container">
      <h1 className="page-title">Course Details</h1>

      <div className="relative flex flex-col justify-start items-start w-full min-h-screen">

        <aside className="flex justify-center items-start bg-gray-50 w-full p-4">
          <div className="w-full"> 
            <Image 
            src="https://img.freepik.com/free-photo/serious-young-caucasian-geometry-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom-holding-hourglass-vertically-looking-it_141793-105472.jpg" 
            className="w-[500px] object-cover border-[2px] border-teal-700"
            height={400}
            width={600}
            alt="course thumbnail" 
            />
          </div>
          <div className="flex flex-col justify-between items-start w-full h-full px-3">
            <h2 className="content-title">Back-End Development with Django</h2>
            <div className="flex justify-between items-center w-full my-1">
              <span className="flex items-center text-gray-400 text-[14px]"><Clock10Icon className="h-3 w-3 mr-1"/> 25 hours</span>
              <span><Badge className={`${badge_color} uppercase`}><ActivityIcon /> {courseStatus}</Badge></span>
            </div>
            <div className="flex justify-between items-center w-full my-1">
              <span className="flex items-center text-gray-400 text-[14px]"><UsersIcon className="h-3 w-3 mr-1"/> 50 Enrollments</span>
              <span className="flex items-center text-gray-400 text-[14px]"><Calendar1Icon className="h-3 w-3 mr-1"/> 2025-05-01</span>
            </div>
            <div>
              <h4 className="my-3 font-bold text-gray-600">Course Description</h4>
              <p className="text-gray-600 text-[12px] mt-4 text-justify h-[9em] overflow-scroll">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse potenti. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. 
                Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. 
                Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. 
                Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. 
                Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex justify-end items-center w-full my-3 gap-3">
          <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PlusIcon /> Add new course</Button>
          <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PencilIcon /> Edit Course</Button>
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
              <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PlusIcon /> Add new lesson</Button>
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
                      <Link href={`/instructor/dashboard/courses/lessons/${data.lessonId}`}>{data.lesson_name}</Link>
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
      <div className="flex justify-end items-center w-full">
          <Button className="bg-red-400 hover:bg-red-500 cursor-pointer"> <TrashIcon /> Delete Course</Button>
      </div>
    </main>
  )
}

export default courseDetailsPage