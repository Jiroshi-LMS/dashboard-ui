import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { page } from "@/lib/constants/RouteConstants";
import { profile_completion } from "@/lib/constants/instructorConstants";
import { RootState } from "@/store";
import { fetchInstructor } from "@/feature/instructor/instructorSlice";
import { authLiterals } from "@/lib/constants/common";



export const useRedirectForLoggedIn = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {data: instructor, status, loggedIn, error:fetchingError} = useAppSelector((state: RootState) => state.instructor);

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

    return {instructor, status, loggedIn, fetchingError}
}


export const useRedirectForLoggedOut = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const {data: instructor, status, loggedIn, error:fetchingError} = useAppSelector((state: RootState) => state.instructor);

    useEffect(() => {
        if (!loggedIn && status === 'idle') dispatch(fetchInstructor());
    }, [loggedIn, status, dispatch])

    useEffect(() => {
        const isInstructorNotReady = (
            (status === 'failed' && !instructor && !loggedIn)
        )
        if (isInstructorNotReady) {
            const timeout = setTimeout(() => {
                const token = localStorage.getItem(authLiterals.ACCESS);
                if (!token) router.replace(page.LOGIN);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [status, loggedIn, instructor, router])

    return {instructor, status, loggedIn, fetchingError}
}