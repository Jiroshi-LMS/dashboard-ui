import { z } from "zod"

export const instructorRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.email().refine((val) => !!val, {
    message: "Enter a valid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phoneNumber: z.string().regex(/^(\d{10})?$/, "Enter a valid 10-digit phone number.").optional(),
})


export const loginFormSchema = z.object({
  email: z.email().refine((val) => !!val, {
    message: "Enter a valid email address.",
  }),
  password: z.string()
})