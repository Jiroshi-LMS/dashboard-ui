import z from "zod";
import { VideoDetailsFormSchema } from "./courseSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";


export const createLessonDetailsService = async (
    values: z.infer<typeof VideoDetailsFormSchema>
): Promise<StandardResponse> => {
    const { data } = await api.post(route.CREATE_LESSON_DETAILS, values)
    return data as StandardResponse
}