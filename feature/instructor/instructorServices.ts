import api from "@/lib/api/axios"
import { route } from "@/lib/constants/apiRoutes"
import { Instructor } from "./instructorTypes"
import { instructorRegistrationSchema } from "@/lib/schemas/instructorSchemas"
import z from "zod"
import { countryCodes } from "@/lib/constants/common"

export const fetchInstructorService = async (): Promise<StandardResponse> => {
    const resp = await api.get(route.ME)
    return resp.data as StandardResponse
}


export const registerInstructorService = async (
    values: z.infer<typeof instructorRegistrationSchema>
): Promise<StandardResponse> => {
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