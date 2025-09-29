import React from 'react'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'

const static_table_data = [
  {
    "courseId": 'course-1',
    "course_name": "Course 1",
    "status": "active",
    "enrolled_students": 10,
    "created_at": "2023-05-01"
  },
  {
    "courseId": 'course-2',
    "course_name": "Course 2",
    "status": "inactive",
    "enrolled_students": 20,
    "created_at": "2023-05-02"
  },
  {
    "courseId": 'course-3',
    "course_name": "Course 3",
    "status": "draft",
    "enrolled_students": 30,
    "created_at": "2023-05-03"
  },
  {
    "courseId": 'course-4',
    "course_name": "Course 4",
    "status": "active",
    "enrolled_students": 40,
    "created_at": "2023-05-04"
  },
  {
    "courseId": 'course-5',
    "course_name": "Course 5",
    "status": "inactive",
    "enrolled_students": 50,
    "created_at": "2023-05-05"
  },
  {
    "courseId": 'course-6',
    "course_name": "Course 6",
    "status": "draft",
    "enrolled_students": 60,
    "created_at": "2023-05-06"
  },
  {
    "courseId": 'course-7',
    "course_name": "Course 7",
    "status": "draft",
    "enrolled_students": 30,
    "created_at": "2023-05-03"
  },
  {
    "courseId": 'course-8',
    "course_name": "Course 8",
    "status": "active",
    "enrolled_students": 40,
    "created_at": "2023-05-04"
  },
  {
    "courseId": 'course-9',
    "course_name": "Course 9",
    "status": "inactive",
    "enrolled_students": 50,
    "created_at": "2023-05-05"
  },
  {
    "courseId": 'course-10',
    "course_name": "Course 10",
    "status": "draft",
    "enrolled_students": 60,
    "created_at": "2023-05-06"
  },
]

const courseManagementPage = () => {
  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>

      <section className='flex justify-between items-center'>
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
          <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PlusIcon /> Add new course</Button>
        </div>
      </section>

      <section className='mt-5'>
        <h2 className='section-title'>All Courses</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead className='text-center'>Status</TableHead>
              <TableHead className='text-center'>Enrolled Students</TableHead>
              <TableHead className='text-center'>Created At</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              static_table_data.map((data, index) => {
                let badge_color = 'bg-primary text-white'
                if (data.status === 'inactive') {
                  badge_color = 'bg-red-400 text-white'
                } else if (data.status === 'draft') {
                  badge_color = 'bg-blue-400 text-white'
                }
                return (
                <TableRow key={index}>
                  <TableCell className='font-semibold'>
                    <Link href={`/instructor/dashboard/courses/${data.courseId}`}>
                      {data.course_name}
                    </Link>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Badge className={`${badge_color} uppercase`}>{data.status}</Badge></TableCell>
                  <TableCell className='text-center'>{data.enrolled_students}</TableCell>
                  <TableCell className='text-center'>{data.created_at}</TableCell>
                  <TableCell className='text-center'><button>...</button></TableCell>
                </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </section>

      <section className='my-3'>
        <Pagination>
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

    </main>
  )
}

export default courseManagementPage