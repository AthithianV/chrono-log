import { create } from "zustand";


type State = {
    tasks: Task[],
    task: Task|null,
    createTaskview: boolean,
}

type Action = {
    addTask: (task:Task)=>void,
    setTasks: (tasks: Task[]) => void,
    updateTask: (task: Task)=>void,
    toggleCreateTaskView: ()=>void,
    selectTask: (task:Task)=>void,
}

const useTask = create<State & Action>((set)=>({
    tasks: [
        {id:1, name: "Development", details: null, hourly_rate: null, lump_sum: null, color: "#0011ff"}
    ],
    createTaskview: false,
    task: null,

    setTasks: (tasks)=>set(()=>({tasks})),
    selectTask: (task)=>set(()=>({task, createTaskview: true})),
    updateTask: (task)=>set((state)=>{
        const index = state.tasks.findIndex(t=>t.id===task.id);
        state.tasks[index] = task;
        return {tasks: state.tasks};
    }),
    addTask: (task)=>set((state)=>{
        state.tasks.push(task)
        return {tasks: state.tasks};
    }),
    toggleCreateTaskView: ()=>set((state)=>({createTaskview: !state.createTaskview, task: null}))
}));

export default useTask;