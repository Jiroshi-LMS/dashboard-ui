import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchListDataService } from '@/feature/common/commonServices'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { useFilters } from '@/hooks/useFilters'
import { page, route } from '@/lib/constants/RouteConstants'
import { Clock10Icon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { LessonListItem } from '../../courseTypes'
import { Badge } from '@/components/ui/badge'
import { CommonPaginationBar } from '@/app/components/organism/Paginator/CommonPaginationBar'
import Loader from '@/app/components/atoms/Loader'


const LessonListView = ({courseId}: {courseId: string}) => {
    const [lessonList, setLessonList] = useState<Array<LessonListItem> | null>(null);
    const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null);
    const [search, setSearch] = useDebouncedState("", 500);
    const [isInitial, setIsInitial] = useState(true);
    const hasFetchedOnce = useRef(false);
    const {
        listFilters: lessonFilters, 
        setListFilters: setLessonFilters, 
        handleFilterChange
    } = useFilters({
        filters: {course_id: courseId},
        ordering: null,
        search: null,
        page: 1,
        page_size: 15,
    })

    const fetchLessonData = async (courseFilters: StandardFilters) => {
        try {
            const resp = await fetchListDataService(
                route.LIST_LESSONS,
                courseFilters
            );
            const paginatedData: PaginatedResults | null = resp?.response;
            if (paginatedData) {
                setPaginationData(paginatedData);
                const formattedCourseData = paginatedData?.results?.map(
                    (lesson: LessonListItem, idx) => {
                        const dateObject = new Date(lesson.created_at);
                        return {
                            ...lesson,
                            created_at: dateObject.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                        };
                    }
                );
                setLessonList(formattedCourseData);
            }
        } catch (err: any) {
            toast.error("Failed to fetch lessons! Try again.");
            setLessonList([]);
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
        setLessonList(null);
        fetchLessonData(lessonFilters);
    }, [lessonFilters]);

    const totalPages = paginationData?.total_pages || 1;

  return (
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
        (!lessonList) ? 
        <Loader className='h-screen' /> : 
        (lessonList.length <= 0) ? 
        <div className="flex justify-center items-center h-[50vh]">
            <h1 className="text-red-400 font-bold text-2xl text-center">"Nothing to show! Try creating a lesson."</h1>
        </div>
        : lessonList.map((data: LessonListItem, index) => {
            let lessonBadgeColor = 'bg-primary text-white'
            if (data.access_status === 'inactive') {
            lessonBadgeColor = 'bg-red-400 text-white'
            } else if (data.access_status === 'draft') {
            lessonBadgeColor = 'bg-blue-400 text-white'
            }
            return (
            <div key={index} className="flex flex-col justify-center items-start w-full p-3 nth-[2n]:bg-gray-100 border-[1px] border-gray-200 rounded-sm my-1">
                <div className="flex justify-between items-center w-full">
                <h4 className="font-bold text-gray-600 my-3">
                    <Link href={`/instructor/dashboard/courses/lessons/${data.uuid}`} className="hover:text-teal-500">{data.title}</Link>
                </h4>
                <span className="ml-2"><Badge className={`${lessonBadgeColor} uppercase`}>{data.access_status}</Badge></span>
                </div>
                <p className="my-1 line-clamp-2 text-[12px] text-gray-500">{data.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi quisquam ullam, repellat eos ipsa quod, distinctio nihil laudantium aut in perferendis illum quidem excepturi quibusdam perspiciatis atque ad dolorem?</p>
                <div className="flex justify-between items-center w-full my-1">
                <span className="flex items-center text-gray-400 text-[14px]"><Clock10Icon className="h-3 w-3 mr-1"/> {data.duration} hours</span>
                <span className="text-gray-400 text-[14px]">{data.created_at}</span>
                </div>
            </div>
            )
        })
        }
        <section className="my-3">
            {paginationData && totalPages > 1 && (
                <CommonPaginationBar
                currentPage={lessonFilters.page}
                totalPages={totalPages}
                onPageChange={(page: number) =>
                    setLessonFilters((prev) => ({ ...prev, page }))
                }
                />
            )}
        </section>
    </section>
  )
}

export default LessonListView