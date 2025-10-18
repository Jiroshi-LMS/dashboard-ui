import z from "zod";
import { courseCreationFormSchema } from "./courseSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";


export const createCourseService = async (
    values: z.infer<typeof courseCreationFormSchema>
): Promise<StandardResponse> => {
    const { data } = await api.post(route.CREATE_COURSE, values)
    return data as StandardResponse
}

export const fetchCourseById = async (courseId: string): Promise<StandardResponse> => {
    const { data } = await api.get(route.RETRIEVE_COURSE(courseId))
    return data as StandardResponse
}