import React from 'react'
import EnrollmentsListData from '@/feature/enrollments/components/EnrollmentsListData';

const enrollmentsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const studentUUID = resolvedSearchParams?.student_uuid as string;
    const courseUUID = resolvedSearchParams?.course_uuid as string;
    return (
        <main className='main-container'>
            <h1 className='page-title'>Enrollments Data</h1>
            <EnrollmentsListData studentUUID={studentUUID} courseUUID={courseUUID} />
        </main>
    )
}

export default enrollmentsPage