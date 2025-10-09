import api from "@/lib/api/axios"
import { route } from "@/lib/constants/apiRoutes"
import { Instructor } from "./instructorTypes"
import { instructorRegistrationSchema } from "@/lib/schemas/instructorSchemas"
import z from "zod"
import { countryCodes } from "@/lib/constants/common"

export const fetchInstructorService = async (): Promise<{
    data: any, status: boolean, msg: string | null
}> => {
    try {
      const resp = await api.get(route.ME)
      const data: StandardResponse = resp.data
      console.log("ME", data)
      if (data?.status) return {data: data?.response, status: true, msg: null};
      return {data: null, status: false, msg: "Couldn't fetch instructor data"};
    } catch(err: any) {
        // TODO: NEED TO REIMPLEMENT TO HANDLE ERRORS BETTER
        return {data: err, status: false, msg: "Couldn't fetch instructor data"}
    }
}


export const registerInstructorService = async (values: z.infer<typeof instructorRegistrationSchema>) => {
    const submissionPayload :InstructorSignupSubmissionPayload = {
      full_name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password,
    }
    if (values.phoneNumber || values.phoneNumber?.length == 10) {
      submissionPayload['country_code'] = countryCodes.IND
      submissionPayload['phone_number'] = values.phoneNumber
    }

    const resp = await api.post(route.INSTRUCTOR, submissionPayload)
    return resp.data as StandardResponse
}