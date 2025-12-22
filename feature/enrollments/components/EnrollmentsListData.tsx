"use client"

import { useDebouncedState } from "@/hooks/useDebouncedState";
import { useFilters } from "@/hooks/useFilters";
import { useEffect, useRef, useState } from "react";
import { page, route } from "@/lib/constants/RouteConstants";
import { fetchListDataService } from "@/feature/common/commonServices";
import toast from "react-hot-toast";
import { TabularDataList } from "@/app/components/organism/DataSection/CommonDataSection";
import SortButton from "@/app/components/atoms/FilterButtons";
import { CommonPaginationBar } from "@/app/components/organism/Paginator/CommonPaginationBar";
import { InfoIcon } from "lucide-react";
import { EnrollmentDataType } from "../enrollmentTypes";
import EnrollmentsListFilters from "./EnrollmentListFilters";
import Link from "next/link";



type EnrollmentsListDataProps = {
    studentUUID?: string;
    courseUUID?: string;
}


const EnrollmentsListData = ({ studentUUID, courseUUID }: EnrollmentsListDataProps) => {
    const [enrollmentDataList, setEnrollmentDataList] = useState<Array<EnrollmentDataType> | null>(null);
    const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null);
    const [search, setSearch] = useDebouncedState("", 500);
    const [isInitial, setIsInitial] = useState(true);
    const hasFetchedOnce = useRef(false);
    const {
        listFilters: enrollmentDataFilters,
        setListFilters: setEnrollmentDataFilters,
        handleFilterChange
    } = useFilters({
        filters: {
            student_uuid: studentUUID,
            course_uuid: courseUUID,
        },
        ordering: null,
        search: null,
        page: 1,
        page_size: 15,
    })

    const fetchEnrollmentData = async (enrollmentDataFilters: StandardFilters) => {
        try {
            const resp = await fetchListDataService(
                route.LIST_ENROLLMENTS,
                enrollmentDataFilters
            );
            const paginatedData: PaginatedResults | null = resp?.response;
            if (paginatedData) {
                setPaginationData(paginatedData);
                const formattedEnrollmentData = paginatedData?.results?.map(
                    (enrollment: EnrollmentDataType, idx) => {
                        const dateObject = new Date(enrollment.created_at);
                        return {
                            ...enrollment,
                            created_at: dateObject.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                        };
                    }
                );
                setEnrollmentDataList(formattedEnrollmentData);
            }
        } catch (err: any) {
            toast.error("Failed to fetch enrollments! Try again.");
            setEnrollmentDataList([]);
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
        setEnrollmentDataList(null);
        fetchEnrollmentData(enrollmentDataFilters);
    }, [enrollmentDataFilters]);

    const totalPages = paginationData?.total_pages || 1;

    return (
        <>
            <section className="flex flex-wrap justify-between items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">

                <EnrollmentsListFilters
                    enrollmentFilters={enrollmentDataFilters}
                    setEnrollmentFilters={setEnrollmentDataFilters}
                    setSearch={setSearch}
                    handleFilterChange={handleFilterChange}
                />

            </section>

            <TabularDataList
                title="All Students"
                data={enrollmentDataList}
                loading={!enrollmentDataList}
                emptyMessage="No students enrolled yet."
                columns={[
                    {
                        header: () => "Student Identifier",
                        align: "center",
                        render: (enrollment) => enrollment.student_identifier,
                    },
                    {
                        header: () => "Course Title",
                        align: "center",
                        render: (enrollment) => (
                            <Link
                                href={page.RETRIEVE_COURSE(enrollment.course_uuid)}
                                className="hover:text-teal-500 font-semibold"
                            >
                                {enrollment.course_title}
                            </Link>
                        ),
                    },
                    {
                        header: () => {
                            return (
                                <>
                                    Enrolled At{" "}
                                    <SortButton
                                        onClick={() => {
                                            const val =
                                                enrollmentDataFilters?.ordering === "-created_at"
                                                    ? "created_at"
                                                    : "-created_at";
                                            handleFilterChange("ordering", val);
                                        }}
                                    />
                                </>
                            );
                        },
                        align: "center",
                        render: (enrollment) => enrollment.created_at,
                    },
                ]}
            />

            <section className="my-3">
                {paginationData && totalPages > 1 && (
                    <CommonPaginationBar
                        currentPage={enrollmentDataFilters.page}
                        totalPages={totalPages}
                        onPageChange={(page: number) =>
                            setEnrollmentDataFilters((prev) => ({ ...prev, page }))
                        }
                    />
                )}
            </section>
        </>
    )
}

export default EnrollmentsListData;