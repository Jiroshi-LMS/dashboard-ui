import api from "@/lib/api/axios"
import { route } from "@/lib/constants/apiRoutes"
import { Instructor } from "./instructorTypes"

export const fetchInstructor = async ():Promise<[Instructor | null | undefined, boolean, string]> => {
    try {
      const resp = await api.get(route.ME)
      const data: StandardResponse = resp.data
      console.log("ME", data)
      if (data?.status) return [data.response, true, "Success"];
      return [data?.response, false, "Failure while fetching instructor information"]
    } catch(err: any) {
      return [err, true, "An Error Occurred. Please try again later."]
    }
}