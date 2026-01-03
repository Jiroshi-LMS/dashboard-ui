import { z } from "zod"

export const instructorRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirmation password is required."),
  phoneNumber: z.string().regex(/^(\d{10})?$/, "Enter a valid 10-digit phone number.").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})


export const loginFormSchema = z.object({
  email: z.email().refine((val) => !!val, {
    message: "Enter a valid email address.",
  }),
  password: z.string()
})


export const instructorProfileInfoSchema = z.object({
  profileImg: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
})


export const instructorAccountDetailsUpdateSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.email().refine((val) => !!val, {
    message: "Enter a valid email address.",
  }),
  phone_number: z.string().regex(/^(\d{10})?$/, "Enter a valid 10-digit phone number.").optional(),
  current_password: z.string().min(1, "Current password is required"),
})


export const instructorPasswordDetailsUpdateFormSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(6, "New password must be at least 6 characters"),
  retype_new_password: z.string().min(6, "New password must be at least 6 characters"),
})
  .refine((data) => data.new_password === data.retype_new_password, {
    path: ["retype_new_password"],
    message: "Passwords do not match",
  })
