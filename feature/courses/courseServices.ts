import z from "zod";
import { courseCreationFormSchema, referenceMaterialResourceFormSchema, updateCourseFormSchema, VideoDetailsFormSchema } from "./courseSchemas";
import api from "@/lib/api/axios";
import { route } from "@/lib/constants/RouteConstants";
import { Course, LessonReferenceMaterial } from "./courseTypes";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { standardErrors } from "@/lib/constants/errors";
import { createLessonDetailsService, createLessonReferenceMaterialRepository } from "./courseRepositories";


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
): Promise<boolean> => {
  try {
    const resp: StandardResponse = await createLessonReferenceMaterialRepository(values, lessonId)
    if (resp?.status) {
      return true
    }
    return false
  } catch (err: any) {
    toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    return false
  }
}