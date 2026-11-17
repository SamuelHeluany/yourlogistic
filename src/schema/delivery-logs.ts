import { z } from "zod";

export const deliveryLogsSchema = z.object({
  delivery_id: z.string().uuid(),
  description: z.string(),
});
