"use client"

import React, { useEffect, useState } from 'react'
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
import { useAppSelector } from '@/hooks/useRedux'
import { listCoursesService } from '@/feature/courses/courseServices'
import toast from 'react-hot-toast'
import { Course } from '@/feature/courses/courseTypes'
import Loader from '@/app/components/atoms/Loader'
import { route } from '@/lib/constants/RouteConstants'



const courseManagementPage = () => {
  const {data: instructor} = useAppSelector((state) => state.instructor)
  const [courseList, setCourseList] = useState<Array<Course>|null>(null)
  const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null)

  const fetchCourseData = async () => {
    try {
      const resp = await listCoursesService()
      const paginatedData: PaginatedResults | null = resp?.response
      if (paginatedData) {
        setPaginationData(paginatedData)
        setCourseList(paginatedData.results)
      }
    } catch (err: any) {
      toast.error("Failed to fetch courses! Try again.")
      setCourseList([])
    } 
  }

  useEffect(() => {
    fetchCourseData()
  }, [])
  
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

      <section className='mt-5'>
        <h2 className='section-title'>All Courses</h2>
        {
          (!courseList) ? <Loader /> : 
          <>
          {
            (courseList.length <= 0) ? <h1>Wow! Such Empty ...</h1> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead className='text-center'>Status</TableHead>
                  <TableHead className='text-center'>Enrolled Students</TableHead>
                  <TableHead className='text-center'>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  courseList?.map((data, index) => {
                    let badge_color = 'bg-primary text-white'
                    if (data.access_status === 'inactive') {
                      badge_color = 'bg-red-400 text-white'
                    } else if (data.access_status === 'draft') {
                      badge_color = 'bg-blue-400 text-white'
                    }
                    return (
                    <TableRow key={index}>
                      <TableCell className='font-semibold'>
                        <Link href={`/instructor/dashboard/courses/${data.uuid}`} className='hover:text-teal-500'>
                          {data.title}
                        </Link>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Badge className={`${badge_color} uppercase`}>{data.access_status}</Badge></TableCell>
                      <TableCell className='text-center'>{data.enrollments}</TableCell>
                      <TableCell className='text-center'>{data.created_at}</TableCell>
                    </TableRow>
                  )})
                }
              </TableBody>
            </Table>
          }
          </>
        }
      </section>

      <section className='my-3'>
        {
          (!paginationData) ? null :
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={paginationData?.previous ?? "#"} />
              </PaginationItem>
              {
                Array.from({ length: paginationData?.total_pages || 1 }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink href={route.LIST_COURSES+`?page=${index+1}`}>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))
              } 
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext href={paginationData?.next ?? "#"} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        }
      </section>

    </main>
  )
}

export default courseManagementPage