import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"



export const retrieveDashboardKPIRepository = async (): Promise<StandardResponse> => {
    const { data } = await api.get(route.DASHBOARD_KPI)
    return data as StandardResponse
}