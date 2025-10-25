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


export type Lesson = {
    access_status: string
    created_at: string
    description: string | null
    duration: number
    title: string
    uuid: string
    video_url: string
}


export type LessonListItem = {
    uuid: string
    created_at: string
    title: string
    access_status: string
    description: string | null
    duration: number
}


export type LessonMediaData = {
    file: File | null,
    duration: number
}


export type LessonRelatedLink = {
    title: string,
    url: string
}


export type LessonReferenceMaterial = {
    title: string,
    file_name: string,
    file_size: number,
    file_type: string,
    file_key: string,
    resource_id: string | null
}