import { create } from "zustand";


type State = {
    workUnits: {
        date: Date,
        units: WorkUnit[]
    }[],
    selectedUnit: WorkUnit | null,    
    workUnitFormView: boolean,
}

type Action = {
    setWorkUnits: (workUnits:{
        date: Date,
        units: WorkUnit[]
    }[])=>void,
    selectUnit: (unit:WorkUnit|null)=>void,
    addWorkUnit: (workUnit:WorkUnit)=>void,
    updateWorkUnit: (workUnit:WorkUnit)=>void,
    toggleWorkUnitFormView: (view:boolean)=>void,
}

const useWorkUnit = create<State & Action>((set)=>({
    workUnits: [{
        date: new Date(),
        units: [{
            id: 1,
            description: "Tauri",
            details: "Worked on Chronolog Overlay Feature",
            date: new Date(),
            start_time: new Date(2025, 1, 21, 11, 30, 0),
            end_time: new Date(2025, 1, 21, 13, 10, 0),
            duration: 3661,
            task: {
                id: 1,
                name: "Development",
                color: "#0011ff"
            },
            tags: [
                {
                    id: 1,
                    name: "Frontend",
                    color: "#00ee00"
                },
                {
                    id: 1,
                    name: "Frontend",
                    color: "#00ee00"
                },
                {
                    id: 2,
                    name: "Frontend",
                    color: "#00e"
                },
                {
                    id: 3,
                    name: "Frontend",
                    color: "#e00"
                },
                {
                    id: 4,
                    name: "Frontend",
                    color: "#ee0"
                },
                {
                    id: 5,
                    name: "Frontend",
                    color: "#0ee"
                },
                {
                    id: 6,
                    name: "Frontend",
                    color: "#e0e"
                }
            ]
        }]
    }],
    workUnitFormView: false,
    selectedUnit: null,

    setWorkUnits: (workUnits)=>set(()=>{
        return {workUnits}
    }),
    selectUnit: (workUnit)=>set(()=>({selectedUnit: workUnit, workUnitFormView: true})),
    addWorkUnit: (workUnit)=>set((state)=>{
        const index = state.workUnits.findIndex(unit=>unit.date===workUnit.date);
        if(index==-1){
            state.workUnits.unshift({date: workUnit.date, units: [workUnit]});
        }else{
            state.workUnits[index].units.unshift(workUnit);
        }
        return {workUnits: state.workUnits};
    }),
    updateWorkUnit: (workUnit) => set((state)=>{
        let index = state.workUnits.findIndex(unit=>unit.date===workUnit.date);
        if(index!=-1){
            let unitIndex = state.workUnits[index].units.findIndex(unit=>unit.id===workUnit.id);
            state.workUnits[index].units[unitIndex] = workUnit;
            return {workUnits: state.workUnits};
        }
        return {};
    }),
    toggleWorkUnitFormView: (view)=>set(()=>({workUnitFormView : view}))
}));

export default useWorkUnit;