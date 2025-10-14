import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"


export const listCoursesService = async (alt_url: string | null = null) => {
    const {data} = await api.get(alt_url || route.LIST_COURSES)
    return data as StandardResponse
}