export type Course = {
    access_status: string
    created_at: string
    description: string | null
    duration: number
    enrollments: number
    thumbnail_url: string | null
    title: string
    uuid: string
}


export type LessonRelatedLink = {
    title: string,
    url: string
}