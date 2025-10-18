export const route = {
    // Auth
    ME: "/instructor/me/",
    LOGIN: "/instructor/login/",
    REFRESH: "/instructor/token/refresh/",
    
    INSTRUCTOR: "/instructor/",
    SET_INSTRUCTOR_PROFILE: "/instructor/profile/",

    LIST_COURSES: "/courses/views/",
    CREATE_COURSE: "/courses/views/",
    RETRIEVE_COURSE: (courseId: string) => `/courses/views/${courseId}/`,
    
    // Common
    GET_PRESIGNED_UPLOAD: "/internals/generate-upload-presigned-url/"
}


export const page = {
    SET_PROFILE: "/auth/set-profile",
    DASHBOARD_HOME: "/instructor/dashboard",
    LOGIN: "/auth/login",

    CREATE_COURSE: "/instructor/dashboard/courses/add-course",
    LIST_COURSE: '/instructor/dashboard/courses',
    CREATE_LESSON: (courseId: string) => `/instructor/dashboard/courses/${courseId}/add-lesson`,
}