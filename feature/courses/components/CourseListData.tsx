import SortButton from "@/app/components/atoms/FilterButtons";
import { TabularDataList } from "@/app/components/organism/DataSection/CommonDataSection";
import { CommonPaginationBar } from "@/app/components/organism/Paginator/CommonPaginationBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Course } from "../courseTypes";
import toast from "react-hot-toast";
import { fetchListDataService } from "@/feature/common/commonServices";
import { route } from "@/lib/constants/RouteConstants";
import CourseListFilters from "./CourseListFilters";
import { useFilters } from "@/hooks/useFilters";

const CourseListData = () => {
    const [courseList, setCourseList] = useState<Array<Course> | null>(null);
    const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null);
    const [search, setSearch] = useDebouncedState("", 500);
    const [isInitial, setIsInitial] = useState(true);
    const hasFetchedOnce = useRef(false);
    const {
    listFilters: courseFilters, 
    setListFilters: setCourseFilters, 
    handleFilterChange
    } = useFilters({
        filters: {},
        ordering: null,
        search: null,
        page: 1,
        page_size: 15,
    })

    const fetchCourseData = async (courseFilters: StandardFilters) => {
        try {
            const resp = await fetchListDataService(
                route.LIST_COURSES,
                courseFilters
            );
            const paginatedData: PaginatedResults | null = resp?.response;
            if (paginatedData) {
                setPaginationData(paginatedData);
                const formattedCourseData = paginatedData?.results?.map(
                (course: Course, idx) => {
                    const dateObject = new Date(course.created_at);
                    return {
                    ...course,
                    created_at: dateObject.toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    };
                }
                );
                setCourseList(formattedCourseData);
            }
        } catch (err: any) {
            toast.error("Failed to fetch courses! Try again.");
            setCourseList([]);
        }
    };

    useEffect(() => {
        if (isInitial) {
            setIsInitial(false);
            return;
        }
        handleFilterChange("search", search);
    }, [search]);

    useEffect(() => {
        if (hasFetchedOnce.current && isInitial) return;
        hasFetchedOnce.current = true;
        setPaginationData(null);
        setCourseList(null);
        fetchCourseData(courseFilters);
    }, [courseFilters]);

    const totalPages = paginationData?.total_pages || 1;

return (
    <>
    <section className="flex flex-wrap justify-between items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">
        
        <CourseListFilters
            courseFilters={courseFilters}
            setCourseFilters={setCourseFilters}
            setSearch={setSearch}
            handleFilterChange={handleFilterChange}
        />

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
              if (course.access_status === "inactive")
                badgeColor = "bg-red-400 text-white";
              else if (course.access_status === "draft")
                badgeColor = "bg-blue-400 text-white";
              return (
                <Badge className={`${badgeColor} uppercase`}>
                  {course.access_status}
                </Badge>
              );
            },
          },
          {
            header: () => {
              return (
                <>
                  Enrolled Students <SortButton onClick={() => {}} />
                </>
              );
            },
            align: "center",
            render: (course) => course.enrollments,
          },
          {
            header: () => {
              return (
                <>
                  Created At{" "}
                  <SortButton
                    onClick={() => {
                      const val =
                        courseFilters?.ordering === "created_at"
                          ? "-created_at"
                          : "created_at";
                      handleFilterChange("ordering", val);
                    }}
                  />
                </>
              );
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
            onPageChange={(page: number) =>
              setCourseFilters((prev) => ({ ...prev, page }))
            }
          />
        )}
      </section>
    </>
  )
}

export default CourseListData