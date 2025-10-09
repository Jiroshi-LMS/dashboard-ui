import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { page } from "@/lib/constants/apiRoutes";
import { profile_completion } from "@/lib/constants/instructorConstants";
import { RootState } from "@/store";
import { fetchInstructor } from "@/store/slices/instructorSlice";

export const useInstructorRedirect = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {data: instructor, status, loggedIn} = useAppSelector((state: RootState) => state.instructor);

    useEffect(() => {
        if (!loggedIn && status === 'idle') dispatch(fetchInstructor());
    }, [loggedIn, status, dispatch])

    useEffect(() => {
        const isInstructorReady = (
            (status === 'succeeded' && instructor) || (loggedIn && instructor)
        )
        if (isInstructorReady) {
            const redirectTo = (instructor.profile_completion_status === profile_completion.PENDING) ?
            page.SET_PROFILE : page.DASHBOARD_HOME;
            router.replace(redirectTo)
        }
    }, [status, loggedIn, instructor, router])
}