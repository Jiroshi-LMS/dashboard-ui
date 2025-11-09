import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"


export const generateKeyPairRepository = async (key_name: string, expires_at_days: number | null) => {
    const { data } = await api.post(route.GENERATE_API_KEYS, {
        key_name, expires_at_days
    })
    return data as StandardResponse
}


export const deleteAPIKeyRepository = async (uuid: string) => {
    const { data } = await api.delete(route.DELETE_API_KEY(uuid))
    return data as StandardResponse
}