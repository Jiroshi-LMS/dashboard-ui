"use client"

import { useDebouncedState } from "@/hooks/useDebouncedState";
import { useFilters } from "@/hooks/useFilters";
import { useEffect, useRef, useState } from "react";
import { StudentData } from "../studentsTypes";
import { page, route } from "@/lib/constants/RouteConstants";
import { fetchListDataService } from "@/feature/common/commonServices";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StudentListFilters from "./StudentListFilters";
import { TabularDataList } from "@/app/components/organism/DataSection/CommonDataSection";
import SortButton from "@/app/components/atoms/FilterButtons";
import { CommonPaginationBar } from "@/app/components/organism/Paginator/CommonPaginationBar";
import { InfoIcon } from "lucide-react";




const StudentListData = () => {
    const [studentList, setStudentList] = useState<Array<StudentData> | null>(null);
    const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null);
    const [search, setSearch] = useDebouncedState("", 500);
    const [isInitial, setIsInitial] = useState(true);
    const hasFetchedOnce = useRef(false);
    const {
        listFilters: studentFilters,
        setListFilters: setStudentFilters,
        handleFilterChange
    } = useFilters({
        filters: {},
        ordering: null,
        search: null,
        page: 1,
        page_size: 15,
    })

    const fetchStudentData = async (studentFilters: StandardFilters) => {
        try {
            const resp = await fetchListDataService(
                route.LIST_STUDENTS,
                studentFilters
            );
            const paginatedData: PaginatedResults | null = resp?.response;
            if (paginatedData) {
                setPaginationData(paginatedData);
                const formattedStudentData = paginatedData?.results?.map(
                    (student: StudentData, idx) => {
                        const dateObject = new Date(student.created_at);
                        return {
                            ...student,
                            created_at: dateObject.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                        };
                    }
                );
                setStudentList(formattedStudentData);
            }
        } catch (err: any) {
            toast.error("Failed to fetch students! Try again.");
            setStudentList([]);
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
        setStudentList(null);
        fetchStudentData(studentFilters);
    }, [studentFilters]);

    const totalPages = paginationData?.total_pages || 1;

    return (
        <>
            <section className="flex flex-wrap justify-between items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">

                <StudentListFilters
                    studentFilters={studentFilters}
                    setStudentFilters={setStudentFilters}
                    setSearch={setSearch}
                    handleFilterChange={handleFilterChange}
                />

            </section>

            <TabularDataList
                title="All Students"
                data={studentList}
                loading={!studentList}
                emptyMessage="No students enrolled yet."
                columns={[
                    {
                        header: () => "Student Identifier",
                        align: "center",
                        render: (student) => student.identifier,
                    },
                    {
                        header: () => {
                            return (
                                <>
                                    Course Enrolled <SortButton onClick={() => {
                                        const val =
                                            studentFilters?.ordering === "-enrollments_count"
                                                ? "enrollments_count"
                                                : "-enrollments_count";
                                        handleFilterChange("ordering", val);
                                    }} />
                                </>
                            );
                        },
                        align: "center",
                        render: (student) => student.enrollments_count || 0,
                    },
                    {
                        header: () => {
                            return (
                                <>
                                    Joined At{" "}
                                    <SortButton
                                        onClick={() => {
                                            const val =
                                                studentFilters?.ordering === "-created_at"
                                                    ? "created_at"
                                                    : "-created_at";
                                            handleFilterChange("ordering", val);
                                        }}
                                    />
                                </>
                            );
                        },
                        align: "center",
                        render: (student) => student.created_at,
                    },
                    {
                        header: () => "Actions",
                        align: "center",
                        render: (student) => (
                            <Link
                                href={`${page.LIST_ENROLLMENTS}?student_uuid=${student.uuid}`}
                                className="flex justify-center items-center hover:text-teal-500 font-semibold"
                            >
                                <InfoIcon className="text-gray-500 cursor-pointer w-4" />
                            </Link>
                        ),
                    }
                ]}
            />

            <section className="my-3">
                {paginationData && totalPages > 1 && (
                    <CommonPaginationBar
                        currentPage={studentFilters.page}
                        totalPages={totalPages}
                        onPageChange={(page: number) =>
                            setStudentFilters((prev) => ({ ...prev, page }))
                        }
                    />
                )}
            </section>
        </>
    )
}

export default StudentListData