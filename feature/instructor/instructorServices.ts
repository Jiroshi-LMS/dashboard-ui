import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"
import { instructorAccountDetailsUpdateSchema, instructorPasswordDetailsUpdateFormSchema, instructorProfileInfoSchema, instructorRegistrationSchema, loginFormSchema } from "@/feature/instructor/instructorSchemas"
import z from "zod"
import { countryCodes } from "@/lib/constants/common"
import { logoutRepository, updateInstructorAccountDetailsRepository, updateInstructorPasswordRepository } from "./instructorRepository"
import toast from "react-hot-toast"
import { standardErrors } from "@/lib/constants/errors"

export const fetchInstructorService = async (): Promise<StandardResponse> => {
  const resp = await api.get(route.ME)
  return resp.data as StandardResponse
}


export const registerInstructorService = async (
  values: z.infer<typeof instructorRegistrationSchema>
): Promise<StandardResponse> => {
  const submissionPayload: InstructorSignupSubmissionPayload = {
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


export const loginInstructorService = async (
  values: z.infer<typeof loginFormSchema>
): Promise<StandardResponse> => {
  const resp = await api.post(route.LOGIN, values)
  return resp.data as StandardResponse
}


export const logoutService = async (): Promise<boolean> => {
  try {
    const resp = await logoutRepository()
    if (resp?.status) {
      toast.success("Logged out successfully !")
      return true
    }
    throw new Error("Failed to logout !")
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
  }
  return false
}

export const setInstructorProfileService = async (
  values: z.infer<typeof instructorProfileInfoSchema>
): Promise<StandardResponse> => {
  const profileUpdateParams: any = {
    location: (values.location && values.location.length > 0) ? values.location : null,
    bio: (values.bio && values.bio.length > 0) ? values.bio : null
  }
  if (values.profileImg && values.profileImg !== "")
    profileUpdateParams['profile_picture'] = values.profileImg
  const resp = await api.post(route.SET_INSTRUCTOR_PROFILE, profileUpdateParams)
  return resp.data as StandardResponse
}


export const InstructorAccountDetailsUpdateService = async (
  values: z.infer<typeof instructorAccountDetailsUpdateSchema>
): Promise<StandardResponse | null> => {
  try {
    const resp: StandardResponse = await updateInstructorAccountDetailsRepository(values)
    if (resp?.status) {
      toast.success("Account Details Updated Successfully !")
      return resp
    }
    throw new Error("Failed to update account details !")
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    return null
  }
}


export const InstructorPasswordUpdateService = async (
  values: z.infer<typeof instructorPasswordDetailsUpdateFormSchema>
): Promise<StandardResponse | null> => {
  try {
    const resp: StandardResponse = await updateInstructorPasswordRepository(values)
    if (resp?.status) {
      toast.success("Password Updated Successfully !")
      return resp
    }
    throw new Error("Failed to update password !")
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    return null
  }
}