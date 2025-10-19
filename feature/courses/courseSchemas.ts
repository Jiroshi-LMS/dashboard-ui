import z from "zod";

export const courseCreationFormSchema = z.object({
    thumbnail: z.string(),
    title: z.string().min(2, "Please provide a course title!"),
    description: z.string().optional(),
})

export const updateCourseFormSchema = z.object({
  title: z.string().min(2, "Full name must be at least 2 characters."),
  description: z.string().optional(),
  access_status: z.boolean(),
  thumbnail: z.string().optional()
})