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
    return await api.patch(route.UPDATE_TEXT_RESOURCES, {
        ...values,
        related_links: relatedLinks
    }) as StandardResponse
}

export const createLessonReferenceMaterialRepository = async (
  values: LessonReferenceMaterial,
  lessonId: string
): Promise<StandardResponse> => {
    return await api.post(route.CREATE_REFERENCE_MATERIAL, {
        ...values,
        lesson_uuid: lessonId
    }) as StandardResponse
}