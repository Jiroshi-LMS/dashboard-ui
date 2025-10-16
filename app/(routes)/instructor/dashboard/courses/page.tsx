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
import { ArrowUpDown, PlusIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Course } from '@/feature/courses/courseTypes'
import { CommonPaginationBar } from '@/app/components/organism/Paginator/CommonPaginationBar'
import { TabularDataList } from '@/app/components/organism/DataSection/CommonDataSection'
import SortButton from '@/app/components/atoms/FilterButtons'
import { fetchListDataService } from '@/feature/common/commonServices'
import { route } from '@/lib/constants/RouteConstants'



const courseManagementPage = () => {
  const [courseList, setCourseList] = useState<Array<Course>|null>(null)
  const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null)
  const [courseFilters, setCourseFilters] = useState<StandardFilters>({
    filters: {},
    ordering: null,
    search: null,
    page: 1
  })

  const fetchCourseData = async (courseFilters: StandardFilters) => {
    try {
      const resp = await fetchListDataService(route.LIST_COURSES, courseFilters)
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
    fetchCourseData(courseFilters)
  }, [courseFilters])

  const handleFilterChange = (filter_key: string, filter_value: string | null) => {
    if (filter_key !== 'search' && filter_key !== 'ordering')
      setCourseFilters((prev) => ({
        ...prev,
        filters: {
          ...courseFilters.filters,
          [filter_key]: filter_value
        }
      }))
    setCourseFilters((prev) => ({
      ...prev,
      [filter_key]: filter_value
    }))
  }

  const totalPages = paginationData?.total_pages || 1

  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>

      <section className='flex justify-between items-center'>
        <div className='flex justify-start items-center gap-2'>
          <div>
            <Select 
            onValueChange={(statusValue: string) => {
              if (statusValue === 'all') handleFilterChange('status', null)
              else handleFilterChange('status', statusValue)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Statuses</SelectLabel>
                  <SelectItem value='all' className='hover:text-white'>All</SelectItem>
                  <SelectItem value="active" className='hover:text-white'>Active</SelectItem>
                  <SelectItem value="inactive" className='hover:text-white'>Inactive</SelectItem>
                  <SelectItem value="draft" className='hover:text-white'>Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input type='date' placeholder='Select date range to filter'/>
          </div>
          <div>
            <Input type="search" name='search' placeholder="Search by course name" 
            onChange={e => {handleFilterChange('search', e.target.value)}} />
          </div>
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
        emptyMessage="Nothing to show! Try creating a course."
        columns={[
          {
            header: () => "Course Name",
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
            header: () => "Status",
            align: "center",
            render: (course) => {
              let badgeColor = "bg-primary text-white";
              if (course.access_status === "inactive") badgeColor = "bg-red-400 text-white";
              else if (course.access_status === "draft") badgeColor = "bg-blue-400 text-white";
              return <Badge className={`${badgeColor} uppercase`}>{course.access_status}</Badge>;
            },
          },
          {
            header: () => {
              return <>Enrolled Students <SortButton onClick={() => {}} /></>
            },
            align: "center",
            render: (course) => course.enrollments,
          },
          {
            header: () => {
              return <>Created At <SortButton onClick={() => {}} /></>
            },
            align: "center",
            render: (course) => course.created_at,
          },
        ]}
      />

      <section className="my-3">
        {paginationData && totalPages > 1 && (
          <CommonPaginationBar
            currentPage={courseFilters.page}
            totalPages={totalPages}
            onPageChange={(page: number) => setCourseFilters((prev) => ({...prev, page}))}
          />
        )}
      </section>

    </main>
  )
}

export default courseManagementPage