import { create } from "zustand";
import pomodaroConfig from "../config/pomodaro";

type State = {
    running: boolean,
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
    setRunning: (bool:boolean)=>void,
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
    running: false,
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


    setRunning: (bool)=>set(()=>({running: bool})),
    setTimer: (timer)=>set(()=>({timer})),
    setDuration: ()=>set((state)=>{        
        if(state.duration === 0){
            if(state.sessionCount === state.sessionCompleted+1 && state.sessionOrBreak === 'SESSION'){
                state.resetPomodaro();
                return {}
            }else{
                return state.sessionOrBreak==="SESSION"
                ?{ duration: state.breakDuration, sessionCompleted: state.sessionCompleted+1, sessionOrBreak: 'BREAK' }
                :{ duration: state.sessionDuration, breakCompleted: state.breakCompleted+1, sessionOrBreak: 'SESSION' }
            }
        }else{
            return { duration: state.duration - 1, running: true}
        }
    }),
    setSessionDuration: (diff)=>set((state)=>{
        if(!state.running && state.sessionDuration+diff <= pomodaroConfig.maxSessionDuration 
            && state.sessionDuration+diff >= pomodaroConfig.minSessionDuration) {
            return {sessionDuration: state.sessionDuration+diff, duration: state.sessionDuration+diff};
        } else {
            return {};
        }
    }),
    setSessionCount: (diff)=>set((state)=>{
        if(!state.running && state.sessionCount+diff <= pomodaroConfig.maxSessionCount 
            && state.sessionCount+diff >= pomodaroConfig.minSessionCount) {
            return {sessionCount: state.sessionCount+diff};
        } else {
            return {};
        }
    }),
    setBreakDuration: (diff)=>set((state)=>{
        if(!state.running && state.breakDuration+diff <= pomodaroConfig.maxBreakDuration 
            && state.breakDuration+diff >= pomodaroConfig.minBreakDuration) {
            return {breakDuration: state.breakDuration+diff};
        } else {
            return {};
        }
    }),
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
                duration: state.sessionDuration,
                running: false
            }
        })
    }
    
}));

export default usePomodaro;