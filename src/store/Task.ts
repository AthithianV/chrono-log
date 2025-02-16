import { create } from "zustand";


type State = {
    tasks: Task[],
    createTaskview: boolean,
}

type Action = {
    addTask: (task:Task)=>void,
    toggleCreateTaskView: ()=>void,
}

const useTask = create<State & Action>((set)=>({
    tasks: [{name: "Web Dev", details:"Time for Web Dev", lumpSum: 0, hourlyRate: 0, color: "#E63A71"}],
    createTaskview: false,

    addTask: (task:Task)=>set((state)=>{
        state.tasks.push(task)
        return {tasks: state.tasks};
    }),
    toggleCreateTaskView: ()=>set((state)=>({createTaskview: !state.createTaskview}))
}));

export default useTask;