"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { listCoursesService } from '@/feature/courses/courseServices'
import toast from 'react-hot-toast'
import { Course } from '@/feature/courses/courseTypes'
import { CommonPaginationBar } from '@/app/components/organism/Paginator/CommonPaginationBar'
import { TabularDataList } from '@/app/components/organism/DataSection/CommonDataSection'



const courseManagementPage = () => {
  const [courseList, setCourseList] = useState<Array<Course>|null>(null)
  const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchCourseData = async (page: number) => {
    try {
      const resp = await listCoursesService(page)
      const paginatedData: PaginatedResults | null = resp?.response
      if (paginatedData) {
        setPaginationData(paginatedData)
        const formattedCourseData = paginatedData?.results?.map((course: Course, idx) => {
          const dateObject = new Date(course.created_at)
          return {
            ...course,
            created_at: dateObject.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }
        })
        setCourseList(formattedCourseData)
      }
    } catch (err: any) {
      toast.error("Failed to fetch courses! Try again.")
      setCourseList([])
    }
  }

  useEffect(() => {
    setPaginationData(null)
    setCourseList(null)
    fetchCourseData(currentPage)
  }, [currentPage])

  const totalPages = paginationData?.total_pages || 1

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
            <Link href="/instructor/dashboard/courses/add-course">
              <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'>
                  <PlusIcon /> Add new course
              </Button>
            </Link>
        </div>
      </section>

      <TabularDataList
        title="All Courses"
        data={courseList}
        loading={!courseList}
        emptyMessage="Nothing to show. Try creating a course"
        columns={[
          {
            header: "Course Name",
            render: (course) => (
              <Link
                href={`/instructor/dashboard/courses/${course.uuid}`}
                className="hover:text-teal-500 font-semibold"
              >
                {course.title}
              </Link>
            ),
          },
          {
            header: "Status",
            align: "center",
            render: (course) => {
              let badgeColor = "bg-primary text-white";
              if (course.access_status === "inactive") badgeColor = "bg-red-400 text-white";
              else if (course.access_status === "draft") badgeColor = "bg-blue-400 text-white";
              return <Badge className={`${badgeColor} uppercase`}>{course.access_status}</Badge>;
            },
          },
          {
            header: "Enrolled Students",
            align: "center",
            render: (course) => course.enrollments,
          },
          {
            header: "Created At",
            align: "center",
            render: (course) => course.created_at,
          },
        ]}
      />

      <section className="my-3">
        {paginationData && totalPages > 1 && (
          <CommonPaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </section>

    </main>
  )
}

export default courseManagementPage