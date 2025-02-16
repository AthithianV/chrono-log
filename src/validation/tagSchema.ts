import { z } from "zod";


export const TagSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().optional().nullable(),
    color: z.string().optional().nullable()
});