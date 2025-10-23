import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { page } from "@/lib/constants/RouteConstants";
import { profile_completion } from "@/lib/constants/instructorConstants";
import { RootState } from "@/store";
import { fetchInstructor, logout} from "@/feature/instructor/instructorSlice";
import { authLiterals } from "@/lib/constants/common";
import { standardErrors } from "@/lib/constants/errors";



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


// export const useRedirectForLoggedOut = () => {
//     const router = useRouter();
//     const dispatch = useAppDispatch()
//     const {data: instructor, status, loggedIn, error:fetchingError} = useAppSelector((state: RootState) => state.instructor);
//     const [handledLogout, setHandledLogout] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem(authLiterals.ACCESS);

//         if (!token && !handledLogout) {
//             setHandledLogout(true);
//             dispatch(logout());
//             router.replace(page.LOGIN);
//             return;
//         }

//         if (status === 'failed' && !instructor && !handledLogout) {
//             setHandledLogout(true);
//             dispatch(logout());
//             router.replace(page.LOGIN);
//         }
//     }, [loggedIn, status, instructor, dispatch, router, handledLogout]);

//     return {instructor, status, loggedIn, fetchingError}
// }

export const useRedirectForLoggedOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: instructor, status, loggedIn, error: fetchingError } = useAppSelector(
    (state: RootState) => state.instructor
  );
  
  // Prevent duplicate operations
  const isLoggingOut = useRef(false);
  const hasCheckedInitialAuth = useRef(false);

  // Logout handler
  const handleLogout = useCallback(() => {
    if (isLoggingOut.current) return;
    
    isLoggingOut.current = true;
    localStorage.removeItem(authLiterals.ACCESS);
    dispatch(logout());
    router.replace(page.LOGIN);
  }, [dispatch, router]);

  // Check if error is auth-related
  const isAuthError = useCallback((error: any) => {
    if (!error) return false;
    const msg = typeof error === 'string' ? error : error?.message || '';
    return (
      msg === standardErrors.SESSION_EXPIRED ||
      msg === standardErrors.TOKEN_EXPIRED ||
      msg.includes('TOKEN') ||
      msg.includes('SESSION')
    );
  }, []);

  // Run once on mount
  useEffect(() => {
    if (hasCheckedInitialAuth.current) return;
    hasCheckedInitialAuth.current = true;

    const token = localStorage.getItem(authLiterals.ACCESS);

    // No token → logout
    if (!token) {
      handleLogout();
      return;
    }

    // Has token but not logged in → fetch
    if (!loggedIn && status === 'idle') {
      dispatch(fetchInstructor());
    }
  }, []);

  // Handle failures
  useEffect(() => {
    if (isLoggingOut.current) return;

    // Failed fetch
    if (status === 'failed' && fetchingError) {
      if (isAuthError(fetchingError)) {
        handleLogout();
      }
      // Network errors don't trigger logout
    }

    // Success but no data
    if (status === 'succeeded' && !instructor) {
      handleLogout();
    }
  }, [status, fetchingError, instructor, isAuthError, handleLogout]);

  // Watch for external token removal
  useEffect(() => {
    if (isLoggingOut.current) return;
    
    const token = localStorage.getItem(authLiterals.ACCESS);
    if (loggedIn && !token) {
      handleLogout();
    }
  }, [loggedIn, handleLogout]);

  return { instructor, status, loggedIn, error: fetchingError };
};