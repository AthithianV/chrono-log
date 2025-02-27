import { z } from "zod";

export const TagSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().nullable().optional(),
    color: z.string()
});

export const TaskSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().nullable().optional(),
    hourly_rate: z.number().nullable().optional(),
    lump_sum: z.number().nullable().optional(),
    color: z.string()
});

export const WorkUnitSchema = z.object({
    description: z.string().nullable(),
    details: z.string().nullable(),
    date: z.date().transform(val=>new Date(val)),
    start_time: z.date({message: "Start Time Required"}),
    end_time: z.date().nullable(),
    task: z.number(),
    tags: z.string().array().optional(),
    duration: z.number(),
});