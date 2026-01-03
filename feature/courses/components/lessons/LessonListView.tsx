import { Button } from '@/components/ui/button'
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
import { cn, getStringifiedDuration } from '@/lib/utils'
import LessonListFilters from './LessonListFilters'


const LessonListView = ({ courseId }: { courseId: string }) => {
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
        filters: { course_id: courseId },
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
                <LessonListFilters
                    courseId={courseId}
                    lessonFilters={lessonFilters}
                    setLessonFilters={setLessonFilters}
                    setSearch={setSearch}
                    handleFilterChange={handleFilterChange}
                />
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
                            let lessonBadgeColor = 'bg-teal-500 text-white'
                            if (data.access_status === 'inactive') {
                                lessonBadgeColor = 'bg-rose-500 text-white'
                            } else if (data.access_status === 'draft') {
                                lessonBadgeColor = 'bg-sky-500 text-white'
                            }
                            return (
                                <div
                                    key={index}
                                    className="group relative flex flex-col justify-center items-start w-full p-5 bg-white border border-slate-200 rounded-xl my-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:border-teal-100 hover:-translate-y-0.5"
                                >
                                    <div className="flex justify-between items-start w-full gap-4">
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-black text-slate-800 tracking-tight leading-snug">
                                                <Link
                                                    href={(data.access_status === 'draft') ?
                                                        page.EDIT_LESSON(courseId, data.uuid) :
                                                        page.RETRIEVE_LESSON(courseId, data.uuid)
                                                    }
                                                    className="hover:text-teal-600 transition-colors"
                                                >
                                                    {data.title}
                                                </Link>
                                            </h4>
                                            <p className="line-clamp-2 text-[12px] text-slate-500 font-medium leading-relaxed">
                                                {data.description || "No description provided for this lesson."}
                                            </p>
                                        </div>
                                        <Badge className={cn(
                                            "uppercase px-2.5 py-0.5 rounded-full text-[10px] font-bold border-none transition-colors shrink-0",
                                            lessonBadgeColor
                                        )}>
                                            {data.access_status}
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center w-full mt-4 pt-3 border-t border-slate-50">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                                                <Clock10Icon className="h-3.5 w-3.5 mr-1.5 text-slate-300" />
                                                {getStringifiedDuration(data.duration)}
                                            </span>
                                        </div>
                                        <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider tabular-nums">
                                            {data.created_at}
                                        </span>
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