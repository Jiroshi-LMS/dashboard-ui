import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"


export const listCoursesService = async (page: number = 1, alt_url: string | null = null) => {
    const {data} = await api.get(alt_url || `${route.LIST_COURSES}?page=${page}`)
    return data as StandardResponse
}