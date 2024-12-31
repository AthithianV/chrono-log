import { appendZero } from "../../utils/formatTime";
import usePomodaro from "../../store/pomodaro";
import { StartIcon, StopIcon } from "../../assets/icons";


const Timer = () => {

  const {resetPomodaro, setDuration, duration, timer, setTimer, sessionCompleted, sessionDuration } = usePomodaro();

  const stop = () => {
    resetPomodaro();
  }

  const start = () =>{
    if(timer) return;
    setTimer(setInterval(()=>{
        setDuration();
    }, 1000));
  }

  return (
    <div className="p-10 w-fit rounded">
        <div className="text-4xl my-10 font-semibold flex justify-center">
            <div className="w-10">{appendZero(Math.floor(duration/60))}</div>
            <span>:</span>
            <div className="w-10">{appendZero(Math.floor(duration)%60)}</div>
        </div>
        <div className="flex-center gap-3 my-2 text-2xl text-white">
            {(duration===sessionDuration && sessionCompleted === 0)
            ?<button className="btn bg-green-500" onClick={start}>{StartIcon}</button>
            :<button className="btn bg-red-500" onClick={stop}>{StopIcon}</button>
            }  
        </div>

    </div>
  )
}

export default Timer;