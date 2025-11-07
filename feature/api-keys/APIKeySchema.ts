import z from "zod";


export const keyGenerationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  expires_at_days: z.enum(["1w", "1m", "1y", "never"]),
})