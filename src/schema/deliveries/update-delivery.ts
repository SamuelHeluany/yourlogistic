import { z } from "zod";

export const updateDeliverySchema = z
  .object({
    description: z.string().min(1, { message: "Description required." }),
  })
  .strict({ message: "Invalid field." });
