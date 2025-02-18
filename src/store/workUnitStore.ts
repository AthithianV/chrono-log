import { create } from "zustand";


type State = {
    workUnits: WorkUnit[],
    selectedTags: Tag[],
    workUnitFormView: boolean
}

type Action = {
    setWorkUnits: (workUnits:WorkUnit[])=>void,
    selectTag: (tag:Tag)=>void,
    removeTag: (tagId:number)=>void,
    addWorkUnit: (workUnit:WorkUnit)=>void,
    updateWorkUnit: (workUnit:WorkUnit)=>void,
    toggleWorkUnitFormView: (view:boolean)=>void,
}

const useWorkUnit = create<State & Action>((set)=>({
    workUnits: [],
    workUnitFormView: false,
    selectedTags: [],

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
    toggleWorkUnitFormView: (view)=>set(()=>({workUnitFormView : view})),
    selectTag: (tag)=>set((state)=>{
        if(state.selectedTags.includes(tag)){
            return {};
        }
        state.selectedTags.push(tag);
        return { selectedTags: state.selectedTags };
    }),
    removeTag: (tagId)=>set((state)=>{
        return {selectedTags: state.selectedTags.filter(tag=>tag.id!==tagId)}
    })
}));

export default useWorkUnit;