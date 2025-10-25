import z from "zod";
import { courseCreationFormSchema, referenceMaterialResourceFormSchema, updateCourseFormSchema, VideoDetailsFormSchema } from "./courseSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";
import { Course, Lesson, LessonMediaData, LessonReferenceMaterial, LessonResourcesAll } from "./courseTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { standardErrors } from "@/lib/constants/errors";
import { createLessonDetailsService, createLessonReferenceMaterialRepository, fetchLessonByIdRepository, fetchLessonResourcesRepository, removeLessonReferenceMaterialRepository, updateLessonMediaRepository } from "./courseRepositories";
import { PresignedUploadReturnState } from "../common/commonTypes";


export const createCourseService = async (
    values: z.infer<typeof courseCreationFormSchema>
): Promise<StandardResponse> => {
  const { data } = await api.post(route.CREATE_COURSE, values)
  return data as StandardResponse
}

export const updateCourseService = async (
    courseId: string, values: z.infer<typeof updateCourseFormSchema>
): Promise<StandardResponse> => {
  const { data } = await api.put(route.UPDATE_COURSE(courseId), values)
  return data as StandardResponse
}

export const retrieveCourseService = async (courseId: string): Promise<StandardResponse> => {
    const { data } = await api.get(route.RETRIEVE_COURSE(courseId))
    return data as StandardResponse
}

export const deleteCourseService = async (courseId: string): Promise<StandardResponse> => {
    const { data } = await api.delete(route.DELETE_COURSE(courseId))
    return data as StandardResponse
}

export const fetchCourseById = async (
    courseId: string, 
    setCourse: React.Dispatch<SetStateAction<Course | null>>,
    setLoading: React.Dispatch<SetStateAction<boolean>>
) => {
    try {
      const resp = await retrieveCourseService(courseId);
      const courseData = resp?.response;
      if (courseData) {
        const dateObject = new Date(courseData.created_at);
        const formattedCourseData: Course = {
          ...courseData,
          created_at: dateObject.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
        setCourse(formattedCourseData);
      } else toast.error(standardErrors.UNKNOWN);
      setLoading(false);
    } catch (err: any) {
      toast.error("Failed to fetch course! Try again.");
      setLoading(false);
    }
  };


export const CreateLessonWithDetails = async (
  values: z.infer<typeof VideoDetailsFormSchema>,
): Promise<{success: boolean, lesson_uuid: string | null}> => {
  try {
    const resp: StandardResponse = await createLessonDetailsService(values)
    if (resp?.status) {
      toast.success("Lesson Created Successfully !")
      return {success: true, lesson_uuid: resp?.response?.lesson_id}
    }
    toast.error(resp?.msg || "Lesson Creation Failed !")
    return {success: false, lesson_uuid: null}
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    return {success: false, lesson_uuid: null}
  }
}


export const CreateLessonReferenceMaterialService = async (
  values: LessonReferenceMaterial,
  lessonId: string
): Promise<{success: boolean, response: {resource_id: string} | null}> => {
  try {
    const resp: StandardResponse = await createLessonReferenceMaterialRepository(values, lessonId)
    if (resp?.status) {
      return {success: true, response: resp?.response}
    }
    return {success: false, response: null}
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    return {success: false, response: null}
  }
}


export const RemoveLessonReferenceMaterialService = async (
  resourceId: string
): Promise<boolean> => {
  try {
    const resp: StandardResponse = await removeLessonReferenceMaterialRepository(resourceId)
    if (resp?.status) return true
    return false
  } catch (err: any) {
    return false;
  }
}


export const UpdateLessonMediaService = async (
  lessonId: string,
  mediaData: LessonMediaData,
  uploadFile: (
    file: File, 
    contentType: string, 
    setUploadProgress?: React.Dispatch<SetStateAction<number>>
    ) => Promise<PresignedUploadReturnState>,
    setFileUploadProgress: React.Dispatch<SetStateAction<number>>
): Promise<boolean> => {
  try {
    if (!mediaData.file || !mediaData.duration) return false
    const {objectKey, isCancelled } = await uploadFile(
      mediaData.file,
      mediaData.file.type,
      setFileUploadProgress
    )
    if (!objectKey || isCancelled.current) {
        isCancelled.current = false;
        setFileUploadProgress(0);
        throw new Error("Upload cancelled!.")
    }
    const resp = await updateLessonMediaRepository(lessonId, objectKey, mediaData.duration)
    if (resp?.status) {
      toast.success("Lesson Media Updated Successfully !")
      return true
    }
    throw new Error("Unable to update lesson media! Please try again later.")
  } catch (err: any) {
    toast.error(
      err?.response?.data?.msg || 
      err?.message || 
      standardErrors.UNKNOWN
    )
    setFileUploadProgress(0);
    return false
  }
}


export const FetchLessonByIdService = async (
  lessonId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setLesson: Dispatch<SetStateAction<Lesson | null>>,
): Promise<boolean> => {
  setLoading(true)
  try {
    const resp: StandardResponse = await fetchLessonByIdRepository(lessonId)
    const lessonData = resp?.response;
      if (resp?.status && lessonData) {
        const dateObject = new Date(lessonData.created_at);
        const formattedLessonData: Lesson = {
          ...lessonData,
          created_at: dateObject.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
        setLesson(formattedLessonData);
        setLoading(false)
        return true
      }
      toast.error(resp?.msg || "Unable to retrieve lesson data! Please try again later.");
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
  }
  setLoading(false)
  return false
}


export const FetchLessonResourcesService = async (
  lessonId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setLessonResources: Dispatch<SetStateAction<LessonResourcesAll | null>>
) => {
  setLoading(true)
  try {
    const resp = await fetchLessonResourcesRepository(lessonId)
    const lessonResources = resp?.response
    if (resp?.status && lessonResources) {
      setLessonResources(lessonResources)
      setLoading(false)
      return true
    }
    toast.error(resp?.msg || "Unable to fetch lesson resources! Please try again later.")
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
  }
  setLoading(false)
  return false
}