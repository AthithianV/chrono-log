import { z } from "zod";

export const TagSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().optional().nullable(),
    color: z.string().optional().nullable()
});

export const TaskSchema = z.object({
    name: z.string().min(4, "Name must contain 4 Characters"),
    details: z.string().optional().nullable(),
    hourly_rate: z.number().optional().nullable(),
    lump_sum: z.number().optional().nullable(),
    color: z.string().optional().nullable()
});

export const WorkUnitSchema = z.object({
    description: z.string().nullable(),
    details: z.string().nullable(),
    date: z.string().transform(val=>new Date(val)),
    start_time: z.string().transform(val=>new Date(val)),
    end_time: z.string().transform(val=>new Date(val)),
    task: z.number(),
    duration: z.custom<`${number}:${number}:${number}, number`>((val)=>{
        if(typeof val === "string"){
            const parts = val.split(":");
            if(parts.length!=3) return false;
            let duration = Number(parts[0])*3600 + Number(parts[1])*60 + Number(parts[2]);
            
            return isNaN(duration) ? false : duration;
        }else{
            return false;
        }
    }, "Duration Must be of Format hh:mm:ss")
    .transform((val) => {
        const parts = val.split(":");
        return Number(parts[0])*3600 + Number(parts[1])*60 + Number(parts[2]);
    })
});