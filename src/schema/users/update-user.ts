import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }).optional(),
  email: z.string().email({ message: "Email must be valid." }).optional(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be least at 6 characters." })
    .optional(),
});
