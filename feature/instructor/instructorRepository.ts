import z from "zod";
import { instructorAccountDetailsUpdateSchema } from "./instructorSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";


export const updateInstructorAccountDetailsRepository = async (
    values: z.infer<typeof instructorAccountDetailsUpdateSchema>
): Promise<StandardResponse> => {
    const {data} = await api.put(route.UPDATE_INSTRUCTOR_INFO, values)
    return data as StandardResponse
}