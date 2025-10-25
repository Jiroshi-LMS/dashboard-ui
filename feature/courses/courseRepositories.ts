import z from "zod";
import { referenceMaterialResourceFormSchema, textResourceFormSchema, VideoDetailsFormSchema } from "./courseSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";
import { LessonReferenceMaterial, LessonRelatedLink } from "./courseTypes";


export const createLessonDetailsService = async (
    values: z.infer<typeof VideoDetailsFormSchema>
): Promise<StandardResponse> => {
    const { data } = await api.post(route.CREATE_LESSON_DETAILS, values)
    return data as StandardResponse
}

export const updateTextResourceRepository = async (
    values: z.infer<typeof textResourceFormSchema>,
    relatedLinks: Array<LessonRelatedLink>
): Promise<StandardResponse> => {
    const { data } = await api.patch(route.UPDATE_TEXT_RESOURCES, {
        ...values,
        related_links: relatedLinks
    })
    return data as StandardResponse
}

export const createLessonReferenceMaterialRepository = async (
  values: LessonReferenceMaterial,
  lessonId: string
): Promise<StandardResponse> => {
    const {data} = await api.post(route.CREATE_REFERENCE_MATERIAL, {
        ...values,
        lesson_uuid: lessonId
    }) 
    return data as StandardResponse
}

export const removeLessonReferenceMaterialRepository = async (
    resourceId: string
): Promise<StandardResponse> => {
    const {data} = await api.delete(route.DELETE_REFERENCE_MATERIAL(resourceId)) 
    return data as StandardResponse

}


export const updateLessonMediaRepository = async (
    lessonId: string, mediaKey: string, mediaDuration: number
): Promise<StandardResponse> => {
    const {data} = await api.patch(route.UPDATE_LESSON_MEDIA(lessonId), {
        media_key: mediaKey,
        media_duration: mediaDuration
    })
    return data as StandardResponse
}


export const fetchLessonByIdRepository = async (
    lessonId: string
): Promise<StandardResponse> => {
    const {data} = await api.get(route.RETRIEVE_LESSON(lessonId))
    return data as StandardResponse
}


export const fetchLessonResourcesRepository = async (
    lessonId: string
): Promise<StandardResponse> => {
    const {data} = await api.get(route.RETRIEVE_LESSON_RESOURCES(lessonId))
    return data as StandardResponse
}