import { z } from "zod";

export const sessionUserSchema = z.object({
  email: z.string().email({ message: "Email must be valid." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be least at 6 characters." }),
});
