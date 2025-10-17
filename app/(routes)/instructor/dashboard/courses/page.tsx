"use client"

import React, { useEffect, useRef, useState } from 'react'
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
import { FilterIcon, PlusIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Course } from '@/feature/courses/courseTypes'
import { CommonPaginationBar } from '@/app/components/organism/Paginator/CommonPaginationBar'
import { TabularDataList } from '@/app/components/organism/DataSection/CommonDataSection'
import SortButton from '@/app/components/atoms/FilterButtons'
import { fetchListDataService } from '@/feature/common/commonServices'
import { route } from '@/lib/constants/RouteConstants'
import { useDebounce } from '@/hooks/useDebounced'
import { DateRangePicker } from '@/app/components/atoms/DateRangePicker'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import { localDateToUTC, utcToLocalDate } from '@/lib/utils'



const courseManagementPage = () => {
  const [courseList, setCourseList] = useState<Array<Course>|null>(null)
  const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null)
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)
  const [isInitial, setIsInitial] = useState(true)
  const hasFetchedOnce = useRef(false)
  const [courseFilters, setCourseFilters] = useState<StandardFilters>({
    filters: {},
    ordering: null,
    search: null,
    page: 1,
    page_size: 15
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
    if (isInitial) {
      setIsInitial(false)
      return
    }
    handleFilterChange("search", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (hasFetchedOnce.current && isInitial) return
    hasFetchedOnce.current = true
    setPaginationData(null)
    setCourseList(null)
    fetchCourseData(courseFilters)
  }, [courseFilters])

  const handleFilterChange = (filter_key: string, filter_value: string | null) => {
    setCourseFilters((prev) => {
      const updated = { ...prev };

      if (filter_key === 'search' || filter_key === 'ordering') {
        updated[filter_key] = filter_value;
      } else {
        updated.filters = { ...prev.filters, [filter_key]: filter_value };
      }

      updated.page = 1;
      return updated;
    });
  };

  const totalPages = paginationData?.total_pages || 1

  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>

      <section className="flex flex-wrap justify-between items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">
        {/* Left side - Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
              >
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              className=" z-30 w-80 bg-white border border-gray-200 rounded-md p-4 shadow-sm my-1"
            >
              <div className="flex flex-col gap-5">
                {/* Date Range */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Date Range</p>
                  <DateRangePicker
                    onChange={(range) => {
                      if (!range) {
                        handleFilterChange("created_at_after", null);
                        handleFilterChange("created_at_before", null);
                        return;
                      }

                      if (range.from)
                        handleFilterChange("created_at_after", localDateToUTC(range.from));
                      if (range.to)
                        handleFilterChange("created_at_before", localDateToUTC(range.to));
                    }}
                    value={{
                      from: courseFilters?.filters?.created_at_after
                        ? utcToLocalDate(courseFilters.filters.created_at_after)
                        : undefined,
                      to: courseFilters?.filters?.created_at_before
                        ? utcToLocalDate(courseFilters.filters.created_at_before)
                        : undefined,
                    }}
                  />
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Status</p>
                  <Select
                    onValueChange={(statusValue: string) => {
                      if (statusValue === "all") handleFilterChange("status", null);
                      else handleFilterChange("status", statusValue);
                    }}
                    defaultValue="all"
                    value={courseFilters?.filters?.status || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full text-sm border-gray-300 hover:bg-gray-100"
                    onClick={() => {
                      setCourseFilters({
                        filters: {},
                        ordering: null,
                        search: null,
                        page: 1,
                        page_size: 15
                      })
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Input */}
          <div className="relative">
            <Input
              type="search"
              name="search"
              placeholder="Search by course name"
              className="pl-9 w-64 border-gray-300"
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right side - Add Button */}
        <div>
          <Link href="/instructor/dashboard/courses/add-course">
            <Button className="bg-primary text-white hover:bg-teal-600 hover:text-white flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add new course
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
              return <>Created At <SortButton 
              onClick={() => {
                const val = (courseFilters?.ordering === 'created_at') ? "-created_at" : "created_at";
                handleFilterChange('ordering', val)
              }} /></>
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