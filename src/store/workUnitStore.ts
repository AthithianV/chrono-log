import { create } from "zustand";


type State = {
    workUnits: WorkUnit[],
    workUnitFormView: boolean
}

type Action = {
    setWorkUnits: (workUnits:WorkUnit[])=>void,
    addWorkUnit: (workUnit:WorkUnit)=>void,
    updateWorkUnit: (workUnit:WorkUnit)=>void,
    toggleWorkUnitFormView: (view:boolean)=>void,
}

const useWorkUnit = create<State & Action>((set)=>({
    workUnits: [],
    workUnitFormView: false,

    setWorkUnits: (workUnits)=>set(()=>({workUnits})),
    addWorkUnit: (workUnit)=>set((state)=>{
        state.workUnits.push(workUnit);
        return {workUnits: state.workUnits};
    }),
    updateWorkUnit: (workUnit) => set((state)=>{
        let index = state.workUnits.findIndex(w=>w.id===workUnit.id);
        if(index!=-1){
            state.workUnits[index] = workUnit;
            return {workUnits: state.workUnits};
        }
        return {};
    }),
    toggleWorkUnitFormView: (view)=>set(()=>({workUnitFormView : view}))
}));

export default useWorkUnit;