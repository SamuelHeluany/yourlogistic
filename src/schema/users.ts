import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Email must be valid." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be least at 6 characters." }),
});
