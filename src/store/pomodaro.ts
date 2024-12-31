import { create } from "zustand";
import pomodaroConfig from "../config/pomodaro";

type State = {
    duration: number,
    timer: null | any,
    sessionDuration: number,
    sessionCount: number,
    sessionCompleted: number,
    breakCompleted: number,
    sessionOrBreak: "SESSION" | "BREAK",
    breakDuration: number,
    autoStart: boolean,
    syncWithTimeTracking: boolean
}

type Action = {
    setDuration: ()=>void;
    setTimer: (timer:any)=>void;
    setSessionDuration: (duration: number)=>void;
    setSessionCount: (count: number)=>void;
    resetPomodaro: ()=>void;
    setBreakDuration: (duration: number)=>void;
    setAutoStart: (bool:boolean)=>void;
    setSyncWithTimeTracking: (bool:boolean) => void;
}

const usePomodaro = create<State & Action>((set)=>({
    duration: pomodaroConfig.sessionDuration,
    timer: null,
    sessionDuration: pomodaroConfig.sessionDuration,
    sessionCount: pomodaroConfig.sessionCount,
    sessionCompleted: 0,
    breakCompleted: 0,
    sessionOrBreak: "SESSION",
    breakDuration: pomodaroConfig.breakDuration,
    autoStart: pomodaroConfig.autoStart,
    syncWithTimeTracking: pomodaroConfig.syncWithTimeTracking,


    setTimer: (timer)=>set(()=>({timer})),
    setDuration: ()=>set((state)=>{
        if(state.duration === 0){
            if(state.sessionCount === state.sessionCompleted){
                state.resetPomodaro();
                return {}
            }else{
                return state.sessionOrBreak==="SESSION"
                ?{ duration: state.breakDuration, sessionCompleted: state.sessionCompleted+1, sessionOrBreak: 'BREAK' }
                :{ duration: state.sessionDuration, breakCompleted: state.breakCompleted+1, sessionOrBreak: 'SESSION' }
            }
        }else{
            return { duration: state.duration - 1}
        }
    }),
    setSessionDuration: (duration)=>set(()=>({sessionDuration: duration})),
    setSessionCount: (count)=>set(()=>({sessionCount: count})),
    setBreakDuration: (duration)=>set(()=>({breakDuration: duration})),
    setAutoStart: (bool)=>set(()=>({autoStart: bool})),
    setSyncWithTimeTracking: (bool) => set(()=>({syncWithTimeTracking: bool})),
    resetPomodaro: ()=>{
        set((state)=>{
            clearInterval(state.timer);
            return {
                sessionCompleted:0,
                breakCompleted: 0,
                sessionOrBreak: 'SESSION',
                timer: null,
                sessionDuration: pomodaroConfig.sessionDuration}
        })
    }
    
}));

export default usePomodaro;