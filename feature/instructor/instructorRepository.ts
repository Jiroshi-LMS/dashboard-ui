import z from "zod";
import { instructorAccountDetailsUpdateSchema, instructorPasswordDetailsUpdateFormSchema } from "./instructorSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";



export const logoutRepository = async (): Promise<StandardResponse> => {
    const { data } = await api.post(route.LOGOUT)
    return data as StandardResponse
}


export const updateInstructorAccountDetailsRepository = async (
    values: z.infer<typeof instructorAccountDetailsUpdateSchema>
): Promise<StandardResponse> => {
    const { data } = await api.put(route.UPDATE_INSTRUCTOR_INFO, values)
    return data as StandardResponse
}


export const updateInstructorPasswordRepository = async (
    values: z.infer<typeof instructorPasswordDetailsUpdateFormSchema>
): Promise<StandardResponse> => {
    const { data } = await api.patch(route.UPDATE_INSTRUCTOR_PASSWORD, values)
    return data as StandardResponse
}