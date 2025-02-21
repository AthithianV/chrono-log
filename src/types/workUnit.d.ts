type WorkUnit = {
    id: number,
    description: string|null,
    details: string|null,
    date: Date,
    start_time: Date,
    end_time: Date | null,
    duration: number,
    tags: Tag[],
    task: Task
}