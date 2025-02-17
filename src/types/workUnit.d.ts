type WorkUnit = {
    id?: number,
    description: string|null,
    details: string|null,
    date: string,
    start_time: number,
    end_time: number,
    duration: number,
    tags: number[],
}