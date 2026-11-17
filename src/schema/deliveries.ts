import { z } from "zod";

export const deliveriesSchema = z.object({
  user_id: z.string().uuid(),
  description: z.string(),
});
