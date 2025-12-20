import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"
import { retrieveDashboardKPIRepository } from "./dashboardRepositories"
import toast from "react-hot-toast"
import { standardErrors } from "@/lib/constants/errors"
import { DashboardKPIServiceResponse } from "./dashboardTypes"



export const retrieveDashboardKPIService = async (): Promise<DashboardKPIServiceResponse | null> => {
    try {
        const resp: StandardResponse = await retrieveDashboardKPIRepository()
        if (resp?.status && resp?.response) {
            return resp.response as DashboardKPIServiceResponse
        }
        toast.error(resp?.msg || "Unable to fetch KPIs at the moment!")
    } catch (err: any) {
        toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    }
    return null
}