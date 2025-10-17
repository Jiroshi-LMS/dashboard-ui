import z from "zod";

export const courseCreationFormSchema = z.object({
    thumbnail: z.string(),
    title: z.string().min(2, "Please provide a course title!"),
    description: z.string().optional(),
})