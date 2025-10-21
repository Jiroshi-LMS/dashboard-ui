import z from "zod";

// Courses

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



// Lessons

export const VideoDetailsFormSchema = z.object({
  title: z.string().min(2, "Full name must be at least 2 characters."),
  description: z.string().optional(),
  course_uuid: z.uuidv4()
})


// Resources

export const textResourceFormSchema = z.object({
  notes: z.string().optional(),
  lesson_uuid: z.string(),
});


export const referenceMaterialResourceFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  referenceFile: z.instanceof(File, { message: "File is required" }),
});