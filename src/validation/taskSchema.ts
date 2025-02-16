import { z } from "zod";


export const TaskSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().optional().nullable(),
    hourly_rate: z.number().optional().nullable(),
    lump_sum: z.number().optional().nullable(),
    color: z.string().optional().nullable()
});