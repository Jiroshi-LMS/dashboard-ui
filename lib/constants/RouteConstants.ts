export const route = {
    // Auth
    ME: "/instructor/me/",
    LOGIN: "/instructor/login/",
    REFRESH: "/instructor/token/refresh/",
    
    INSTRUCTOR: "/instructor/",
    SET_INSTRUCTOR_PROFILE: "/instructor/profile/",

    LIST_COURSES: "/courses/views/",
    CREATE_COURSE: "/courses/views/",
    UPDATE_COURSE: (courseId: string) => `/courses/views/${courseId}/`,
    RETRIEVE_COURSE: (courseId: string) => `/courses/views/${courseId}/`,
    DELETE_COURSE: (courseId: string) => `/courses/views/${courseId}/`,

    CREATE_LESSON_DETAILS: "/courses/lessons/",
    UPDATE_LESSON_MEDIA: (lessonId: string) => `/courses/lessons/${lessonId}/update-lesson-media/`,

    UPDATE_TEXT_RESOURCES: "/courses/resources/update-text-resources/",
    CREATE_REFERENCE_MATERIAL: "/courses/resources/",
    DELETE_REFERENCE_MATERIAL: (resourceId: string) => `/courses/resources/${resourceId}/`,

    
    // Common
    GET_PRESIGNED_UPLOAD: "/internals/generate-upload-presigned-url/"
}


export const page = {
    SET_PROFILE: "/auth/set-profile",
    DASHBOARD_HOME: "/instructor/dashboard",
    LOGIN: "/auth/login",

    CREATE_COURSE: "/instructor/dashboard/courses/add-course",
    LIST_COURSE: '/instructor/dashboard/courses',
    RETRIEVE_COURSE: (courseId: string) => `/instructor/dashboard/courses/${courseId}`,
    CREATE_LESSON: (courseId: string) => `/instructor/dashboard/courses/${courseId}/add-lesson`,
}